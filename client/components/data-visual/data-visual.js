angular
  .module('chai_test')
  .controller('DataVisualController', ['$scope', 'DataService', function($scope, DataService){
    $scope.dayStats = [];
    $scope.labels = null;
    $scope.weekday = 0;
    $scope.weekend = 0;
    $scope.month = 0;
    $scope.title = null;
    $scope.best = null;
    $scope.worst = null;
    $scope.getData = function(){
        let dataset = DataService.get();
        let data = dataset[0];
        let monthTotal = 0;
        let weekday = (data['weekday_average'] / 1000).toFixed(1);
        let weekend = (data['weekend_average'] / 1000).toFixed(1);
        let dayStats = data['day_stats'];
        let date = Object.keys(dayStats);
        let best = data['best_three'].data.map(function(d){ return d[1]; });
        let worst = data['worst_three'].data.map(function(d){ return d[1]; });
        for(let i in dayStats) {
          $scope.dayStats.push(dayStats[i] / 1000);
          monthTotal += dayStats[i];
        }
        $scope.best = Math.min(...best) / 1000;
        $scope.worst = Math.max(...worst) / 1000;
        $scope.month = (monthTotal / 1000).toFixed();
        $scope.labels = date.map(function(d){ return d = new Date(parseInt(d) * 1000); });
        $scope.title = moment($scope.labels[0], 'YYYY/MM/DD').format('MMMM');
        $scope.weekday = weekday;
        $scope.weekend = weekend;
    }

    $scope.getData();
    $scope.colors = ['#3aa794'];

    $scope.options = {
      title: {
        fontStyle: 'bold',
        display: true,
        text: `${$scope.title}'s Energy Usage`,
        fontSize: 18
      },
      scales: {
        xAxes: [{
          type: "time",
          time: {
              unit: 'week',
              displayFormats: {
                week: 'M/DD'
              },
              tooltipFormat: 'MMMM DD',
              min: $scope.labels[0],
              max: $scope.labels[$scope.labels.length]
          },
          ticks: {
            fontSize: 14
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 14,
            callback: function(val, idx, vals){
              return `${val} kWh`
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data){
            var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
            return `${datasetLabel}${tooltipItem.yLabel} kWh`;
          }
        }
      }
    }

  }]);