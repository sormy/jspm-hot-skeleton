# JSPM Skeleton #

## Features ##

- React
- Babel
- FontAwesome
- Bootstrap 4.x + SCSS + customization

## From Scratch ##

### Initialize ###

```shell
jspm init
```

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
    "dist/js/bootstrap.js": {
      "deps": [
        "jquery",
        "tether"
      ],
      "exports": "$",
      "format": "global"
    }
  }
}'
```
