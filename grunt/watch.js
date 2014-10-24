module.exports = {
  injectJS: {
    files: ['<%= yeoman.client %>/{app}/**/*.js',
      '!<%= yeoman.client %>/{app}/**/*.spec.js',
      '!<%= yeoman.client %>/{app}/**/*.mock.js',
      '!<%= yeoman.client %>/app/app.js'
    ],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: ['<%= yeoman.client %>/{app}/**/*.css'],
    tasks: ['injector:css']
  },
  mochaTest: {
    files: ['server/**/*.spec.js'],
    tasks: ['env:test', 'mochaTest']
  },
  jsTest: {
    files: ['<%= yeoman.client %>/{app}/**/*.spec.js',
      '<%= yeoman.client %>/{app}/**/*.mock.js'
    ],
    tasks: ['newer:jshint:all', 'karma']
  },
  injectLess: {
    files: ['<%= yeoman.client %>/{app}/**/*.less'],
    tasks: ['injector:less']
  },
  less: {
    files: ['<%= yeoman.client %>/{app,components}/**/*.less'],
    tasks: ['less', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
      '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
      '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
      '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  },
  express: {
    files: ['server/**/*.{js,json}'],
    tasks: ['express:dev', 'wait'],
    options: {
      livereload: true,
      nospawn: true
    }
  }
};