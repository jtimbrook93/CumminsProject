var salesApp = new Vue({
  el: '#salesMain',
data: {

  DistributionArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: '',
    quarter2Revenue: '',
    quarter3Revenue: '',
    quarter4Revenue: '',
    profitMargin: ''

  }],

  EnginesArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: '',
    quarter2Revenue: '',
    quarter3Revenue: '',
    quarter4Revenue: '',
    profitMargin: ''

  }],
  FiltrationArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: '',
    quarter2Revenue: '',
    quarter3Revenue: '',
    quarter4Revenue: '',
    profitMargin: ''

  }],
  PowerGenerationArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: '',
    quarter2Revenue: '',
    quarter3Revenue: '',
    quarter4Revenue: '',
    profitMargin: ''

  }]
},

    methods: {
      fetchAll(){
        this.fetchEngines();
        this.fetchFiltration();
        this.fetchDistribution();
        this.fetchPowerGeneration();
      },

      fetchDistribution() {
        fetch('api/sales.php?businessSegment=Distribution')
        .then( response => response.json() )
        .then( json => {
          salesApp.DistributionArr = json;
         // this.buildSalesChart();
         } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        });
      },

      fetchEngines() {
        fetch('api/sales.php?businessSegment=Engines')
        .then( response => response.json() )
        .then( json => {
          salesApp.EnginesArr = json;
         // this.buildSalesChart();
         } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        });
      },

      fetchFiltration() {
        fetch('api/sales.php?businessSegment=Filtration')
        .then( response => response.json() )
        .then( json => {
          salesApp.FiltrationArr = json;
         // this.buildSalesChart();
         } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        });
      },

      fetchPowerGeneration() {
        fetch('api/sales.php?businessSegment=Power%20Generation')
        .then( response => response.json() )
        .then( json => {
          salesApp.PowerGenerationArr = json;
         // this.buildSalesChart();
         } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        });
      },

  buildSalesChart() {
      Highcharts.chart('salesChart', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Revenue by Division'
          },

          xAxis: {
              categories: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'
              ],
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Revenue in Millions'
              }
          },
          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          },
          series: [{
              name: 'Tokyo',
              data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

          }, {
              name: 'New York',
              data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

          }, {
              name: 'London',
              data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

          }, {
              name: 'Berlin',
              data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

          }]
      });
    },
//  buildSalesChart() {
//     Highcharts.chart('salesChart', {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: 'Stacked column chart'
//     },
//     xAxis: {
//         categories: ['Distribution', 'Engines', 'Filtration', 'Power Generation']
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: 'Percent of Revenue'
//         }
//     },
//     tooltip: {
//         pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
//         shared: true
//     },
//     plotOptions: {
//         column: {
//             stacking: 'percent'
//         }
//     },
//     series: [{
//         name: 'Quarter 1 Revenue',
//         data: this.sales.map( item => [item.quarter1Revenue])
//       },{
//         name: 'Quarter 2 Revenue',
//         data:  this.sales.map( item => [item.quarter2Revenue])
//     }, {
//         name: 'Quarter 3 Revenue',
//         data:  this.sales.map( item => [item.quarter3Revenue])
//         },{
//         name: 'Quarter 4 Revenue',
//         data:  this.sales.map( item => [item.quarter4Revenue])
//         }
//       ]
//     });
//
// }
// getSeries(){
//   var series = [];
//   if(this.businessSegment=='Distribution')
//   {
//     series = [{name: 'Distribution', data: this.sales.map( item => [item.quarter1Revenue])}]
//   }
//   else if(this.dataValue=='fuelMassFlowRate')
//   {
//     series = [{name: 'fuelMassFlowRate', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.fuelMassFlowRate])}]
//   }
//   else if(this.dataValue == "drag")
//   {
//     series = [{name: 'drag', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.drag])}]
//   }
//   else if(this.dataValue=='thrust')
//   {
//     series = [{name: 'thrust', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.thrust])}]
//   }
//   else if(this.dataValue == "fuelBurned")
//   {
//     series = [{name: 'fuelBurned', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.fuelBurned])}]
//   }
//   else if(this.dataValue=='fuelEfficiency')
//   {
//     series = [{name: 'fuelEfficiency', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.fuelEfficiency])}]
//   }
//   else if(this.dataValue == "noxLevels")
//   {
//     series = [{name: 'noxLevels', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.noxLevels])}]
//   }
//   else if(this.dataValue=='momentumChangeAMF')
//   {
//     series = [{name: 'momentumChangeAMF', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.momentumChangeAMF])}]
//   }
//   else if(this.dataValue == "momentumChangeFMF")
//   {
//     series = [{name: 'momentumChangeFMF', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.momentumChangeFMF])}]
//   }
//   else if(this.dataValue=='energyBalance')
//   {
//     series = [{name: 'energyBalance', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.energyBalance])}]
//   }
//   else if(this.dataValue == "propulsiveEfficiency")
//   {
//     series = [{name: 'propulsiveEfficiency', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.propulsiveEfficiency])}]
//   }
//   else if(this.dataValue=='thermalEfficiency')
//   {
//     series = [{name: 'thermalEfficiency', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.thermalEfficiency])}]
//   }
//   return series;
// },
},


      created() {

        // Do data fetch
        this.fetchAll();

      }
    });
