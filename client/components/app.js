angular.module('chai_test', ['ui.router']);

angular
.module('chai_test')
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('data_visual', {
      url: '/',
      templateUrl: 'components/data-visual/data-visual.html',
      controller: 'DataVisualController'
    })
}]);