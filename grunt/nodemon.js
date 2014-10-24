module.exports = {
  debug: {
    script: 'server/app.js',
    options: {
      nodeArgs: ['--debug-brk'],
      env: {
        PORT: 9000
      },
      callback: function(nodemon) {
         nodemon.on('log', function (event) {
            console.log(event.colour);
         });

         nodemon.on('config:update', function() {
            setTimeout(function() {
               require('open')('http://localhost:8080/debug?port=5858');
            }, 500);
         });
      }
    }
  }
};
