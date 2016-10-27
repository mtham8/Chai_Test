angular
  .module('chai_test')
  .controller('DataVisualController', ['$scope', 'DataService',
    function($scope, DataService){
      var vm = this;
      vm.dayStats = [];
      vm.labels = null;
      vm.weekday = 0;
      vm.weekend = 0;
      vm.month = 0;
      vm.title = null;
      vm.best = null;
      vm.worst = null;
      vm.getData = function(){
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
            vm.dayStats.push(dayStats[i] / 1000);
            monthTotal += dayStats[i];
          }
          vm.best = Math.min(...best) / 1000;
          vm.worst = Math.max(...worst) / 1000;
          vm.month = (monthTotal / 1000).toFixed();
          vm.labels = date.map(function(d){ return d = new Date(parseInt(d) * 1000); });
          vm.title = moment(vm.labels[0], 'YYYY/MM/DD').format('MMMM');
          vm.weekday = weekday;
          vm.weekend = weekend;
      }

      vm.getData();
      vm.colors = ['#3aa794'];

      vm.options = {
        title: {
          fontStyle: 'bold',
          display: true,
          text: `${vm.title}'s Energy Usage`,
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
                min: vm.labels[0],
                max: vm.labels[vm.labels.length]
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