module.exports = {
  options: {
    jshintrc: '<%= yeoman.client %>/.jshintrc',
    reporter: 'C:\\Users\\buckler1\\Desktop\\webdev\\doleacpowerrankings_old\\node_modules\\jshint-stylish\\stylish.js'
  },
  server: {
    options: {
      jshintrc: 'server/.jshintrc'
    },
    src: ['server/**/*.js', '!server/**/*.spec.js']
  },
  serverTest: {
    options: {
      jshintrc: 'server/.jshintrc-spec'
    },
    src: ['server/**/*.spec.js']
  },
  all: ['<%= yeoman.client %>/{app,components}/**/*.js',
    '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
    '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
  ],
  test: {
    src: ['<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '<%= yeoman.client %>/{app,components}/**/*.mock.js'
    ]
  }
};