(function (window, bs) {
  var socket = bs.socket;

  socket.on('system:reload', function (data) {
    var loader = SystemJS || System;

    if (!loader) {
      throw 'BrowserSync SystemJS Hot Reloader: unable to find SystemJS';
    }

    loader.import('systemjs-hot-reloader')
      .then(function (exports) {
        var reloader = exports.default;
        reloader.reloadPath(data.path);
      })
      .catch(function (error) {
        console.error('BrowserSync SystemJS Hot Reloader: unable to load SystemJS Hot Reloader');
        console.error(error);
      });
  });
})(window, window.___browserSync___);
