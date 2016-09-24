SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "app/": "src/"
  },
  packages: {
    "app": {
      "main": "index.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
