module.exports = function(config) {
  var appBase    = 'src/'; // transpiled app JS and map files
  var appSrcBase = 'src/'; // app source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter')
    ],

    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },

    files: [
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',
      
      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      { pattern: 'node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd.js', included: false, watched: false },
      //{ pattern: 'node_modules/@angular/http/bundles/http-testing.umd.js', included: true, watched: false },

      { pattern: 'systemjs.config.js', included: false, watched: false },
      'karma-test-shim.js',

      { pattern: 'src/**/*.js', included: false, watched: true },
      { pattern: 'src/**/*.ts', included: false, watched: true },
      { pattern: 'src/**/*.js.map', included: false, watched: true }
    ],

    reporters: ['progress', 'kjhtml'],

    exclude: [],
    preprocessors: {},
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
