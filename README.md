# JSPM Skeleton #

## Features ##

- browser sync
- jspm / system js
- bootstrap 4.x with js/scss customization
- font awesome
- open sans
- react
- babel
- react hot reload
- scss hot reload with dependency tracking
- javascript hot reload
- production build with minification and asset bundling

## TODO ##

- plugin-scss
  - source maps
  - cdn
  - automatic asset inliner
  - speedup
  - cache dependencies (speedup)
- bs-systemjs-hot-reloader: fix todo
- systemjs-hot-reloader: fix todo
- css-url-rewriter-ex: fix todo
- asset hot reload
- babel-plugin
  - fix generation of bundle without minification

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

Reloading of react components works out from the box with `bs-systemjs-hot-reloader`
and `systemjs-hot-reloader`, but state is not preserved.

You need to install 3rd party library to preserve state on reload.

```shell
jspm install npm:react-hot-loader@^3.0.0-beta.6 --dev
```

### Install Font-Awesome ###

```shell
jspm install font-awesome
```

### Install Bootstrap 4.x ###

You need to override configuration to be able to access source

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
