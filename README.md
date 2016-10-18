# JSPM Hot Skeleton #

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

## Tests ##

Run `npm start` before testing:

- Modify `src/Counter.jsx` and see immediate change propagation and state will
  remain the same (counter number).
- Modify `src/Counter.jsx` with bad JS/JSX syntax. You will see error in console
  and application state will be reverted. Once you will fix issue page will hot
  reloaded. So it's "coding on the fly" friendly.
- Modify `src/bootstrap/_variables.scss` and set `$brand-primary` to another
  value. `bs-systemjs-hot-reloader` will handle change and will find parent
  module `src/bootstrap/bootstrap.scss` and will reload it. It should take
  around 3 secs.
- Remove `__reload` hook from `src/index.jsx` and hot reload will still works
  but React application state will not be preserved.
- Modify `index.css`, for example, `margin` for `body` and you will see that
  changes were immediately propagated to browser.
- Check that Font Awesome icon is visible on the page. That means that css url
  rewrite works well.
- Check that Open Sans font is used as default. That means that css url
  rewrite works well. Also it means that bootstrap 4.x configuration works well.

Run `npm run serve` to check how production build will work:

- You should see Font Awesome icon, Open Sans and red Bootstrap button.
- All CSS assets should be in `dist`.
- Production index.html should be in `dist`.
- Minified application bundle `app.js` should be in `dist`.
- Source maps should be on the side in `app.js.map`

Run `npm run serve:dev` to check how development build will work:

- You should see Font Awesome icon, Open Sans and red Bootstrap button.
- All CSS assets should be in `dist`.
- Production index.html should be in `dist`.
- Non minified application bundle `app.js` should be in `dist`.
- Source maps should be on the side in `app.js.map`

## TODO ##

- currently it depends from `github:sormy/plugin-sass@master` package but
  it should be fixed once PR will be merged in upstream `plugin-sass`
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
- systemjs-builder
  - rollup breakes source maps
  - jspm_packages files don't have correct source content in source maps
  - no way to pass options to internal babel compiler, like `"compact": false`

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
