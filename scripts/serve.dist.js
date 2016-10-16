var browserSync = require('browser-sync');

var bsConfig = require('./serve.config');

var bs = browserSync.create();

bs.init(Object.assign({ server: 'dist' }, bsConfig));
