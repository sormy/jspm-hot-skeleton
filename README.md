# JSPM Skeleton #

## SystemJS Hot Reloader ##

Use `browser-sync` and plugin `bs-systemjs-hot-reloader` to run development server
watch for changes, trace relations and emit `reload` events to connected clients.

Avoid using of loaders via `!` because in that case there is no 100% way to
convert file name into module name so reloader will have to iterate over all
registered modules to find correct module name. It is recommended to define
loader via `meta` SystemJS config section for files based on their extension.

## TODO ##

- fix reloader with modules with ! in the end

- Source Maps
- fix SCSS assets path resolve
- fix react hot reloader deps
- react redbox?
- recover after error
- show all errors in fancy window
- show notify() on reload
- __reload() for each reloaded module
- __unload() for each unloaded module
- inject new module in each dep to omit usage of SystemJS.import in __reload()
- assume that scss|sass|less|style have no exports
  (so reloading them will not cause reload for modules which imports them)
- babel plugin to strip __unload() / __reload() in production builds
- module unload if it is not used anymore
- fancy error screen

## Features ##

- JSPM 0.19.x
- React
- Babel
- FontAwesome
- Open Sans
- Bootstrap 4.x + SCSS + customization
- CSS/SCSS

## From Scratch ##

### Initialize ###

```shell
jspm init
```

- create /index.html
- fix /jspm.config.js
- create /src sample application

### Install CSS plugin ###

```shell
jspm install css --dev
```

### Install React ###

```shell
jspm install babel-preset-react --dev
```

fix jspm.config.js:

```javascript
SystemJS.config({
  packages: {
    "app": {
      "main": "index",
      "defaultExtension": "jsx",
      "meta": {
        "*.jsx": {
          "loader": "plugin-babel",
          "babelOptions": {
            "presets": [
              "babel-preset-react"
            ]
          }
        }
      }
    }
  }
});
```

```shell
jspm install react react-dom
```

### Install React Hot Reloader ###

Reloading of react components works out from the box with bs-jspm-reloader, but
state is not preserved.

You need to install 3rd party library to preserve state on reload.

Based on original react-hot-loader package.json.

```shell
jspm install npm:react-hot-loader@^3.0.0-beta.5 --dev -o '{
  "dependencies": {
    "global": "^4.3.0",
    "babel-template": "^6.7.0",
    "react": "^15.0.2",
    "react-proxy": "^3.0.0-alpha.0",
    "react-deep-force-update": "^2.0.1",
    "redbox-react": "^1.2.5",
  }
}'
```

### Install Font-Awesome ###

```shell
jspm install font-awesome
```

### Install Bootstrap 4.x ###

```shell
jspm install bootstrap=github:twbs/bootstrap@4.0.0-alpha.4 -o '{
  "directories": {
    "lib": ""
  },
  "meta": {
    "js/src/*.js": {
      "deps": [
        "jquery",
        "tether"
      ],
      "exports": "$"
    }
  }
}'
```

### Install Open Sans ###

```shell
jspm install open-sans=github:FontFaceKit/open-sans
```
