module.exports = {
  server: ['less'],
  test: ['less'],
  debug: {
    tasks: ['nodemon', 'node-inspector'],
    options: {
      logConcurrentOutput: true
    }
  },
  dist: ['less', 'imagemin', 'svgmin']
};