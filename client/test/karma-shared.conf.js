// Karma configuration
// Generated on Thu Oct 23 2014 22:39:46 GMT-0700 (PDT)

module.exports = function(config) {
   config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '..',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['mocha', 'chai-sinon', 'chai-as-promised'],


      // list of files / patterns to load in the browser
      files: [
         // 3rd party code
         'bower_components/angular/angular.js',
         'bower_components/angular-mocks/angular-mocks.js',
         'bower_components/angular-resource/angular-resource.js',
         'bower_components/angular-ui-router/release/angular-ui-router.js',

         // app specific code
         'app/**/*.module.js',
         'app/**/*.js',

         // test specific code
         'app/**/*.spec.js'
      ],

      // list of files to exclude
      exclude: [
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['mocha'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false
   });
};