(function (window, bs) {
  var socket = bs.socket;

  socket.on('system:reload', function (data) {
    var loader = SystemJS || System;

    loader.import('systemjs-hot-reloader')
      .then(function (exports) {
        var reloader = exports.default;
        reloader.reloadPath(data.path);
      });
  });
})(window, window.___browserSync___);
