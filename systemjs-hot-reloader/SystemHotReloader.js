export default class SystemHotReloader {
  constructor(loader) {
    if (!loader) {
      throw 'Unable to instantiate SystemReloader without SystemJS instance';
    }

    this.loader = loader;
    this.debug = true;
  }

  log(message) {
    if (this.debug) {
      console.log(message)
    }
  }

  reloadPath(path) {
    this.log(`Reloading file: ${path}`);
    return this.reloadModule(this.loader.normalizeSync(path));
  }

  reloadModule(moduleName) {
    this.log(`Reloading module: ${moduleName}`);

    if (!this.loader.get(moduleName)) {
      this.log(`Module ${moduleName} was not reloaded because it was never loaded`);
      return;
    }

    let rootModuleRecords = this.findRootModules(moduleName);

    return Promise.resolve()
      .then(() => {
        this.log(`Found ${rootModuleRecords.length} root module(s):`);
        rootModuleRecords.forEach((rootModuleRecord) => {
          this.log(` - ${rootModuleRecord.name}`);
        });
      })
      /*
      .then(() => {
        // TODO save reloadModuleRecord.importers

        rootModuleRecords.forEach((rootModuleRecord) => {
          this.log(`Saving backup for ${rootModuleRecord.dependencies.length} dependent module(s) of ${rootModuleRecord.name}:`);
          rootModuleRecord.dependencies.forEach((moduleName) => {
            this.log(` - ${moduleName}`);
          });
          rootModuleRecord.depBackup = this.saveModuleBackup(rootModuleRecord.dependencies);
        });
      })
      */
      .then(() => {
        rootModuleRecords.forEach((rootModuleRecord) => {
          this.log(`Removing ${rootModuleRecord.dependencies.length} dependent module(s) of ${rootModuleRecord.name}:`);
          rootModuleRecord.dependencies.forEach((moduleName) => {
            this.log(` - ${moduleName}`);
          });

          rootModuleRecord.dependencies.forEach((moduleName) => {
            this.deleteModule(moduleName);
          });
        })
      })
      .then(() => {
        let promises = rootModuleRecords.map((rootModuleRecord) => {
          let rootModule = this.loader.get(rootModuleRecord.name);
          let reloadHook = rootModule.__reload ? rootModule.__reload : undefined;

          if (reloadHook) {
            this.log(`Reloading root module using hook: ${rootModuleRecord.name}`);
            return Promise.resolve()
              .then(reloadHook)
              .then(() => {
                this.fixModuleRels(rootModuleRecord.name);
              });

            /*
            return Promise.resolve()
              .then(reloadHook)

              .then((result) => {
                return result === false ? Promise.reject() : undefined;
              })
              .then(() => {
                let entryRecord = this.loader._loader.moduleRecords[rootModuleRecord.name];
                entryRecord.dependencies = entryRecord.dependencies
                  .filter((depRecord) => !!depRecord)
                  .map((depRecord) => {
                    let currentDepRecord = this.loader._loader.moduleRecords[depRecord.name];
                    if (currentDepRecord !== depRecord) {
                      currentDepRecord.importers.push(entryRecord);
                      return currentDepRecord;
                    }
                    return depRecord;
                  });
              });
              */
          } else {
            this.log(`Saving backup for root module: ${rootModuleRecord.name}`);
            rootModuleRecord.backup = this.saveModuleBackup([rootModuleRecord.name]);

            this.log(`Removing root module: ${rootModuleRecord.name}`);
            this.deleteModule(rootModuleRecord.name);

            this.log(`Importing root module: ${rootModuleRecord.name}`);
            return this.loader.import(rootModuleRecord.name);
          }
        });

        return Promise.all(promises);
      })
      .catch((error) => {
        this.log(error.message);
        this.log(error.stack);

        this.log(`An error occured during reloading. Reverting...`);

        // TODO: load reloadModuleRecord.importers

        /*
        let promises = rootModuleRecords.map((rootModuleRecord) => {
          this.loadModuleBackup(rootModuleRecord.depBackup);
          if (rootModuleRecord.backup) {
            this.loadModuleBackup(rootModuleRecord.backup);
          }
          return this.loader.import(rootModuleRecord.name);
        });

        return Promise.all(promises);
        */
      });
  }

  fixModuleRels(name) {
    let moduleRecords = this.loader._loader.moduleRecords;

    let moduleRecord = moduleRecords[name];

    moduleRecord.dependencies
      .forEach((depModuleRecord, index) => {
        if (!depModuleRecord) {
          return;
        }

        let newDepModuleRecord = moduleRecords[depModuleRecord.name];

        if (newDepModuleRecord !== depModuleRecord) {
          this.log(`Fixing dependency ${depModuleRecord.name} for module ${moduleRecord.name}`);
          //moduleRecord.dependencies[index] = newDepModuleRecord;
          //moduleRecord.setters[index](newDepModuleRecord.exports);

          // TODO: need to add if not exists and fix if exists
          newDepModuleRecord.importers.push(moduleRecord);
        }
      });

    /*
    moduleRecord.importers
      .forEach((impModuleRecord, index) => {
        if (!impModuleRecord) {
          return;
        }

        let newImpModuleRecord = moduleRecords[impModuleRecord.name];

        if (newImpModuleRecord !== impModuleRecord) {
          this.log(`Fixing importer ${impModuleRecord.name} for module ${moduleRecord.name}`);
          moduleRecord.importers[index] = newImpModuleRecord;

          this.fixModuleRels(impModuleRecord.name);
        }
      });
    */
  }

  deleteModule(name) {
    let moduleRecord = this.loader._loader.moduleRecords[name];

    moduleRecord.dependencies
      .forEach((depModuleRecord) => {
        if (!depModuleRecord) {
          return;
        }
        depModuleRecord.importers
          .forEach((impModuleRecord, index) => {
            if (impModuleRecord && moduleRecord.name === impModuleRecord.name) {
              this.log(`Removing import ${impModuleRecord.name} from module ${depModuleRecord.name}`);
              depModuleRecord.importers[index] = null;
            }
          });
      });

    /*
    moduleRecord.importers
      .forEach((impModuleRecord) => {
        if (!impModuleRecord) {
          return;
        }
        impModuleRecord.dependencies
          .forEach((depModuleRecord, index) => {
            if (depModuleRecord && moduleRecord.name === depModuleRecord.name) {
              this.log(`Removing dependency ${depModuleRecord.name} from module ${impModuleRecord.name}`);
              impModuleRecord.dependencies[index] = null;
            }
          });
      });
    */

    this.log(`Removing module: ${name}`);
    this.loader.delete(name);
  }

  saveModuleBackup(list) {
    return list.reduce((result, moduleName) => {
      result[moduleName] = {
        exports: this.loader.get(moduleName),
        record: this.loader._loader.moduleRecords[moduleName]
      };
      return result;
    }, {});
  }

  loadModuleBackup(state) {
    for (let moduleName in state) {
      let data = state[moduleName];
      this.loader.set(moduleName, data.exports);
      this.loader._loader.moduleRecords[moduleName] = data.record;
    }
  }

  findRootModules(name) {
    let moduleRecords = this.loader._loader.moduleRecords;

    let importers = moduleRecords[name] ? moduleRecords[name].importers : [];

    if (!importers.length) {
      return [{ name: name, dependencies: [] }];
    }

    return importers.reduce((result, moduleRecord) => {
      if (!moduleRecord) {
        return result;
      }

      let rootModules = this.findRootModules(moduleRecord.name);

      rootModules.forEach((record) => {
        record.dependencies.push(name);
      });

      Array.prototype.push.apply(result, rootModules);

      return result;
    }, []);
  }
}
