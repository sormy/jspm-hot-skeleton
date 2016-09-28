# JSPM Skeleton #

## TODO ##

- Source Maps
- fix SCSS assets path resolve
- fix react hot reloader deps
- react redbox?

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
