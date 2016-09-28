export default class SystemHotReloader {
  constructor(loader) {
    this.loader = loader || SystemJS || System;
    this.logLevel = 3;  // 0 - none, 1 - error, 2 - info, 3 - debug
    this.logger = this.createLogger('HMR');

    if (!loader) {
      throw 'Unable to instantiate SystemJS Hot Reloader without SystemJS';
    }
  }

  createLogger(prefix) {
    return {
      debug: (message) => {
        if (this.logLevel >= 3 && console && console.debug) {
          console.debug(`[${prefix}] ${message}`);
        }
      },
      info: (message) => {
        if (this.logLevel >= 2 && console && console.info) {
          console.info(`[${prefix}] ${message}`);
        }
      },
      error: (message) => {
        if (this.logLevel >= 1 && console && console.warn) {
          console.warn(`[${prefix}] ${message}`);
        }
      }
    }
  }

  reloadPath(path) {
    this.logger.debug(`File reload: ${path}`);
    return this.reloadModule(this.loader.normalizeSync(path));
  }

  stripUrlBase(url) {
    if (url.startsWith(this.loader.baseURL)) {
      return './' + url.substr(this.loader.baseURL.length).replace(/!.*$/, '');
    }
    return url.replace(/!.*$/, '');
  }

  reloadModule(moduleName) {
    let startTime = performance.now();

    this.logger.info(`Module reload: ${this.stripUrlBase(moduleName)}`);

    if (!this.loader.get(moduleName)) {
      this.logger.info(`Nothing to update`);
      return;
    }

    let rootModuleRecords = this.findRootModules(moduleName);
    let updatedModules;

    return Promise.resolve()
      .then(() => {
        this.logger.debug(`Found ${rootModuleRecords.length} root module(s):`);
        rootModuleRecords.forEach((rootModuleRecord) => {
          this.logger.debug(` - ${this.stripUrlBase(rootModuleRecord.name)}`);
        });
      })
      /*
      .then(() => {
        // TODO save reloadModuleRecord.importers

        rootModuleRecords.forEach((rootModuleRecord) => {
          this.logger.info(`Saving backup for ${rootModuleRecord.dependencies.length} dependent module(s) of ${this.stripUrlBase(rootModuleRecord.name)}:`);
          rootModuleRecord.dependencies.forEach((moduleName) => {
            this.logger.info(` - ${this.stripUrlBase(moduleName)}`);
          });
          rootModuleRecord.depBackup = this.saveModuleBackup(rootModuleRecord.dependencies);
        });
      })
      */
      .then(() => {
        rootModuleRecords.forEach((rootModuleRecord) => {
          if (!rootModuleRecord.dependencies.length) {
            return;
          }

          this.logger.debug(`Removing ${rootModuleRecord.dependencies.length} dependent module(s) of ${this.stripUrlBase(rootModuleRecord.name)}:`);
          rootModuleRecord.dependencies.forEach((moduleName) => {
            this.logger.debug(` - ${this.stripUrlBase(moduleName)}`);
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

          updatedModules = rootModuleRecord.dependencies.slice(0);
          if (!reloadHook) {
            updatedModules.push(rootModuleRecord.name);
          }

          if (reloadHook) {
            this.logger.debug(`Reloading root module using hook: ${this.stripUrlBase(rootModuleRecord.name)}`);
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
            if (!rootModuleRecord.name.match(/\.(scss|sass|less|css)$/)) {
              this.logger.debug(`Saving backup for root module: ${this.stripUrlBase(rootModuleRecord.name)}`);
              rootModuleRecord.backup = this.saveModuleBackup([rootModuleRecord.name]);
            }

            this.logger.debug(`Removing root module: ${this.stripUrlBase(rootModuleRecord.name)}`);
            this.deleteModule(rootModuleRecord.name);

            this.logger.debug(`Importing root module: ${this.stripUrlBase(rootModuleRecord.name)}`);
            return this.loader.import(rootModuleRecord.name);
          }
        });

        return Promise.all(promises);
      })
      .then(() => {
        if (updatedModules.length) {
          this.logger.info(`Updated modules:`);
          updatedModules.forEach(name => {
            this.logger.info(` - ${this.stripUrlBase(name)}`);
          });
        } else {
          this.logger.info(`Nothing to update`);
        }

        let time = (performance.now() - startTime) / 1000;
        this.logger.info(`Reload took ${Math.floor(time * 100) / 100} sec`);
      })
      .catch((error) => {
        this.logger.error(error.message);
        this.logger.error(error.stack);

        this.logger.error(`An error occured during reloading. Reverting...`);

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
          this.logger.debug(`Fixing dependency ${this.stripUrlBase(depModuleRecord.name)} for module ${this.stripUrlBase(moduleRecord.name)}`);
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
          this.logger.info(`Fixing importer ${this.stripUrlBase(impModuleRecord.name)} for module ${this.stripUrlBase(moduleRecord.name)}`);
          moduleRecord.importers[index] = newImpModuleRecord;

          this.fixModuleRels(impModuleRecord.name);
        }
      });
    */
  }

  deleteModule(name) {
    let moduleRecord = this.loader._loader.moduleRecords[name];

    if (moduleRecord) {
      moduleRecord.dependencies
        .forEach((depModuleRecord) => {
          if (!depModuleRecord) {
            return;
          }
          depModuleRecord.importers
            .forEach((impModuleRecord, index) => {
              if (impModuleRecord && moduleRecord.name === impModuleRecord.name) {
                this.logger.debug(`Removing import ${this.stripUrlBase(impModuleRecord.name)} from module ${this.stripUrlBase(depModuleRecord.name)}`);
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
                this.logger.info(`Removing dependency ${this.stripUrlBase(depModuleRecord.name)} from module ${this.stripUrlBase(impModuleRecord.name)}`);
                impModuleRecord.dependencies[index] = null;
              }
            });
        });
      */
    }

    this.logger.debug(`Removing module: ${this.stripUrlBase(name)}`);
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
