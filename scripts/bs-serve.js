var browserSync = require('browser-sync');
var bsSystemHotReloader = require('bs-systemjs-hot-reloader');

var bsConfig = require('./bs.config');

var bs = browserSync.create();

bs.watch([
  'index.html',
  'jspm.config.js'
]).on('change', bs.reload);

bs.use(bsSystemHotReloader, {
  files: [
    'src/**/*.scss',
    'src/**/*.sass',
    'src/**/*.less',
    'src/**/*.styl',
    'src/**/*.css',
    'src/**/*.jsx',
    'src/**/*.js',
    'src/**/*.tsx',
    'src/**/*.ts',
  ]
});

bs.init(Object.assign({ server: '.' }, bsConfig));
