module.exports = {
   scripts: {
    options: {
      transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
        ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.module.js',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
          '!{.tmp,<%= yeoman.client %>}/app/app.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mongolab.js', // ignore the service that uses the mongo lab rest api
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js'
        ]
      ]
    }
  },
  less: {
    options: {
      transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector'
    },
    files: {
      '<%= yeoman.client %>/app/app.less': ['<%= yeoman.client %>/{app,components}/**/*.less',
        '!<%= yeoman.client %>/app/app.less'
      ]
    }
  },
  css: {
    options: {
      transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
      starttag: '<!-- injector:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': ['<%= yeoman.client %>/{app,components}/**/*.css']
    }
  }
};
