# JSPM Skeleton #

## Features ##

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
jspm install react
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
