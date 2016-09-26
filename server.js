var browserSync = require('browser-sync');
var bsSystemHotReloader = require('./bs-systemjs-hot-reloader');

var bs = browserSync.create();

bs.watch(['index.html', 'jspm.config.js']).on('change', bs.reload);

bs.use(bsSystemHotReloader, {
  files: [
    'src/**/*.scss',
    'src/**/*.css',
    'src/**/*.jsx',
  ]
});

bs.init({
  online: false,
  open: false,
  reloadOnRestart: true,
  server: '.'
});
