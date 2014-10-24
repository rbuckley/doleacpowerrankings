module.exports = {
  options: {
    module: 'doleacPowerRankingsApp',
    htmlmin: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    usemin: 'app/app.js'
  },
  main: {
    cwd: '<%= yeoman.client %>',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/templates.js'
  },
  tmp: {
    cwd: '.tmp',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/tmp-templates.js'
  }
};