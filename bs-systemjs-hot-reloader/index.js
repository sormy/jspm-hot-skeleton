var fs = require('fs');

var PLUGIN_FULL_NAME = 'SystemJS Hot Reloader';
var PLUGIN_SHORT_NAME = 'SystemJS';

module.exports['plugin'] = function (opts, bs) {
  var logger = bs.getLogger(PLUGIN_SHORT_NAME);
  var clients = bs.io.of(bs.options.getIn(['socket', 'namespace']));

  bs.events.on('file:changed', function (data) {
    if (data.namespace !== PLUGIN_FULL_NAME) {
      return;
    }

    if (data.event !== 'change') {
      return;
    }

    logger.info('{cyan:File changed: {magenta:%s', data.path);
    clients.emit('system:reload', { path: data.path });
  });
}

module.exports['plugin:name'] = PLUGIN_FULL_NAME;

module.exports['hooks'] = {
  'client:js': fs.readFileSync(__dirname + '/client.js', 'utf-8')
};
