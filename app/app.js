'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.gnomes'
])
.constant('dataUrl', 'https://bitbucket.org/!api/2.0/snippets/alexgugo/knxnd/363d7f40fc0a0b28480edbe1a0a7487d40c1a8b0/files/data.json')
.config(function($urlRouterProvider) {
  $urlRouterProvider.when('', '/gnomes');
})
.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/gnomes');
})
.component('myApp', {
  template: `
    <div class="container">
      <header class="text-center">
        <h1>GNOMES</h1>
      </header>
      <main>
        <section class="col-xs-12 loading" ng-if="$ctrl.loading">
          <p>Loading</p>
        </section>
        <section class="col-xs-12 error" ng-if="$ctrl.error">
          <p>Something went wrong. Try again late.r</p>
        </section>
        <ui-view ng-if="$ctrl.loaded">
        </ui-view>
      </main>
    </div>
  `,
  controller: function(BackendService) {
    this.$onInit = function() {
      this.loading = true;
      BackendService.load().then( () => {
        this.loading = false;
        this.loaded = true;
        this.error = false;
      }, () => {
        this.error = true;
        this.loading = false;
        this.loaded = false;
      });
    };
  }
});
