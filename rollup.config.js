export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/ngx-user-admin.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.ngx-user-admin',
  external: ['@angular/http'],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/http' : 'vendor._angular_http',
    'rxjs/Observable': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable'
  }
}
