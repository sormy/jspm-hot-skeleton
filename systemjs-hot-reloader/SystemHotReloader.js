export default class SystemHotReloader {
  constructor(loader, logLevel) {
    this.loader = loader || SystemJS || System;

    // 0 - none, 1 - error, 2 - info, 3 - debug
    this.logLevel = logLevel !== undefined ? logLevel : 3;

    this.logger = this.createLogger('HMR');

    if (!this.loader) {
      throw 'Unable to instantiate SystemJS Hot Reloader without SystemJS';
    }
  }

  /**
   * Create logger.
   */
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

  /**
   * Resolve module file path to module name..
   */
  resolvePath(path) {
    // try obvious resolve filename.ext => filename.ext
    let name1 = this.loader.normalizeSync(path);
    if (this.loader.get(name1)) {
      return name1;
    }

    // try less obvious resolve filename.ext => filename.ext!
    let name2 = this.loader.normalizeSync(path + '!');
    if (this.loader.get(name2)) {
      return name2;
    }

    // try to find by filename path in all registered modules, slow :-(
    let name3 = Object.keys(this.loader._loader.modules).find(name => {
      if (name.startsWith(name1 + '!')) {
        return true;
      }
    });
    if (name3) {
      return name3;
    }
  }

  /**
   * Reload module by file path.
   */
  reloadPath(path) {
    this.logger.debug(`Reloading file: ${path}`);

    let name = this.resolvePath(path);

    if (name) {
      return this.reloadModule(name);
    }

    // we did not find module :-(
    this.logger.info(`Nothing to update`);
    return Promise.resolve();
  }

  /**
   * Clean full module name from useless base url prefix and loader related suffix.
   */
  cleanName(name) {
    // remove base url prefix
    if (name.startsWith(this.loader.baseURL)) {
      name = './' + name.substr(this.loader.baseURL.length);
    }

    // remove loader related garbage
    return name.replace(/!.*$/, '');
  }

  /**
   * Reload module by full module name.
   */
  reloadModule(moduleName) {
    let startTime = performance.now();

    this.logger.info(`Reloading module ${this.cleanName(moduleName)}`);

    if (!this.loader.get(moduleName)) {
      this.logger.info('Nothing to update');
      return;
    }

    let moduleChain = this.getReloadChain([moduleName]);
    let updatedModules = [];
    let moduleBackups = [];

    return Promise.resolve()
      .then(() => {
        this.logger.debug('Reload chain:');
        moduleChain.forEach((name) => {
          this.logger.debug(` - ${this.cleanName(name)}`);
        });
      })
      .then(() => {
        let promise = Promise.resolve();

        moduleChain.forEach((name) => {
          const exports = this.loader.get(name);

          const unload = exports ? exports.__unload : undefined;
          const reload = exports ? exports.__reload : undefined;

          if (reload) {
            // TODO: mark module to refix on backup restore

            promise = promise
              .then(() => this.fixModuleDeps(name))
              .then(() => reload(moduleChain));
          } else {
            moduleBackups.push(this.getModuleBackup(name));

            promise = promise
              .then(() => unload ? unload(moduleChain) : undefined)
              .then(() => this.deleteModule(name))
              .then(() => this.importModule(name));
          }

          promise = promise.then(() => {
            const options = [];
            if (reload) {
              options.push('__reload()');
            } else if (unload) {
              options.push('__unload()');
            }
            updatedModules.push({ name, options });
          });
        });

        return promise;
      })
      .then(() => {
        if (updatedModules.length) {
          this.logger.info('Updated modules:');
          updatedModules.forEach((record) => {
            const suffix = record.options.length ? `{ ${record.options.join(', ')} }` : '';
            this.logger.info(` - ${this.cleanName(record.name)} ${suffix}`);
          });
        } else {
          this.logger.info('Nothing to update');
        }

        let time = (performance.now() - startTime) / 1000;
        this.logger.info(`Reload took ${Math.floor(time * 100) / 100} sec`);
      })
      .catch((error) => {
        if (error) {
          this.logger.error(error.stack || error);
        }

        this.logger.error('An error occured during reloading. Reverting...');

        this.restoreModuleBackups(moduleBackups);
      });
  }

  /**
   * Fix module dependencies before hooked reload.
   */
  fixModuleDeps(name) {
    let moduleRecords = this.loader._loader.moduleRecords;

    let moduleRecord = moduleRecords[name];

    moduleRecord.dependencies
      .forEach((depModuleRecord, index) => {
        if (!depModuleRecord) {
          return;
        }

        let newDepModuleRecord = moduleRecords[depModuleRecord.name];

        if (!newDepModuleRecord) {
          return;
        }

        if (newDepModuleRecord !== depModuleRecord) {
          this.logger.debug(`Fixing dependency ${this.cleanName(depModuleRecord.name)} for module ${this.cleanName(moduleRecord.name)}`);

          moduleRecord.setters[index](newDepModuleRecord.exports);

          if (moduleRecord.dependencies[index] !== newDepModuleRecord.exports) {
            moduleRecord.dependencies[index] = newDepModuleRecord;
          }

          let impRecord = newDepModuleRecord.importers
            .find((record) => record && record.name === moduleRecord);
          if (!impRecord) {
            newDepModuleRecord.importers.push(moduleRecord);
          }
        }
      });
  }

  /**
   * Import module.
   */
  importModule(name) {
    this.logger.debug(`Importing module ${this.cleanName(name)}`);
    return this.loader.import(name);
  }

  /**
   * Delete module and fix importers for dependencies.
   */
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
                this.logger.debug(`Removing importer ${this.cleanName(impModuleRecord.name)} from module ${this.cleanName(depModuleRecord.name)}`);
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
                this.logger.info(`Removing dependency ${this.cleanName(depModuleRecord.name)} from module ${this.cleanName(impModuleRecord.name)}`);
                impModuleRecord.dependencies[index] = null;
              }
            });
        });
      */
    }

    this.logger.debug(`Removing module ${this.cleanName(name)}`);
    this.loader.delete(name);
  }

  /**
   * Get module backup which could be used to restore module state.
   */
  getModuleBackup(name) {
    const exports = this.loader.get(name);
    const record = this.loader._loader.moduleRecords[name];
    return { name, record, exports };
  }

  /**
   * Restore module set from array of backups.
   */
  restoreModuleBackups(backups) {
    backups.forEach((data) => {
      this.loader.set(data.name, data.exports);
      this.loader._loader.moduleRecords[data.name] = data.record;
    });
  }

  /**
   * Get shortest distance to the root module (root modules have no importers).
   */
  getModuleDistanceToRoot(name, record, cache) {
    let distance;
    if (cache[name] !== undefined) {
      return cache[name];
    }
    if (!record || !record.importers.length) {
      distance = 0;
    } else {
      distance = record.importers.reduce((result, impRecord) => {
        let impDistance = 1 + this.getModuleDistanceToRoot(impRecord.name, impRecord, cache);
        return result === null ? impDistance : Math.min(result, impDistance);
      }, null);
    }
    cache[name] = distance;
    return distance;
  }

  /**
   * Reduce dependency tree and return modules in the order they should be reloaded.
   */
  getReloadChain(modules, cache) {
    if (modules.length === 0) {
      return modules;
    }

    const records = this.loader._loader.moduleRecords;

    if (!cache) {
      cache = {};
    }

    const farNode = modules.reduce((result, name, index) => {
      const record = records[name] ? records[name] : undefined;
      const distance = this.getModuleDistanceToRoot(name, record, cache);
      const importers = !record ? [] : record.importers.map((item) => item.name);
      const reload = record && record.exports && record.exports.__reload;
      const meta = { distance, index, name, importers, reload };
      if (result === undefined) {
        return meta;
      }
      return result.distance >= distance ? result : meta;
    }, undefined);

    const nextModules = modules.slice(0);
    nextModules.splice(farNode.index, 1);
    if (!farNode.reload) {
      farNode.importers.forEach((name) => {
        if (nextModules.indexOf(name) === -1) {
          nextModules.push(name);
        }
      });
    }

    const nextResult = this.getReloadChain(nextModules, cache);

    const result = [farNode.name].concat(nextResult);

    return result;
  }
}
