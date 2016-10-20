angular
  .module('chai_test')
  .controller('DataVisualController', ['$scope', 'DataService', function($scope, DataService){

    $scope.data = null;

    $scope.testing = function(){
      DataService.get().then(function(data){
        $scope.data = data;
      });
    }

    $scope.testing();
  }]);