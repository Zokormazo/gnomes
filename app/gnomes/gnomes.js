'use strict';

angular.module('myApp.gnomes', ['ui.router', 'ui.bootstrap', 'myApp.backend'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('gnomes', {
    url: '/gnomes',
    component: 'gnomeList'
  });
}])

.component('gnomeList', {
  template: `
    <section class="gnomes-list">
      <div class="row search-bar">
        <div class="col-sm-6 col-sm-offset-3">
          <div class="input-group">
            <input type="text" class="form-control" ng-model="$ctrl.searchTerm" ng-change="$ctrl.updateFilteredGnomes()">
            <div class="input-group-addon">
              <span class="glyphicon glyphicon-search"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="row gnomes-list">
        <div class="col-md-6" ng-repeat="gnome in $ctrl.filteredGnomes.slice((($ctrl.currentPage-1)*$ctrl.itemsPerPage), (($ctrl.currentPage)*$ctrl.itemsPerPage))">
          <gnome-list-item gnome="gnome"></gnome-list-item>
        </div>
      </div>
      <div class="row paginator">
        <div class="col-md-6 col-md-offset-3 text-center">
          <ul uib-pagination total-items="$ctrl.totalItems" items-per-page="$ctrl.itemsPerPage" ng-model="$ctrl.currentPage" boundary-links="true" rotate="true" force-ellipses="true" max-size="5"></ul>
        </div>
      </div>
    </section>
  `,
  controller: function(BackendService, $filter) {
    this.gnomes = BackendService.getList();
    this.filteredGnomes = this.gnomes;
    this.pagedGnomes = [];
    this.searchTerm = '';

    this.updateFilteredGnomes = function() {
      this.filteredGnomes = $filter('filter')(this.gnomes, { name: this.searchTerm});
      this.totalItems = this.filteredGnomes.length;
    };

    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalItems = this.filteredGnomes.length;
  }
})

.component('gnomeListItem', {
  bindings: {
    gnome: '<'
  },
  template: `
    <article class="gnome-list-item" ui-sref="gnome({ gnomeId: $ctrl.gnome.id})">
      <div class="well well-sm">
        <div class="row">
          <div class="col-xs-6 col-sm-4 img-frame">
            <img ng-src="{{$ctrl.gnome.thumbnail}}" class="img-rounded img-gnome-photo"/>
          </div>
          <div class="col-xs-6 col-sm-8">
            <h5 class="gnome-name">{{$ctrl.gnome.name}}</h5>
            <p class="gnome-info">
              Age: {{ $ctrl.gnome.age }} <br />
              Weight: {{ $ctrl.gnome.weight }} <br />
              Height: {{ $ctrl.gnome.height }} <br />
              Hair Color: {{ $ctrl.gnome.hair_color }} <br />
              <span ng-if="$ctrl.gnome.friends.length > 0">
                Friends: {{ $ctrl.gnome.friends.join(', ')}} <br />
              </span>
              Proffesions: {{ $ctrl.gnome.professions.join(', ')}}
            </p>
          </div>
        </div>
      </div>
    </article>
  `
});
