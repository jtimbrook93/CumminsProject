        var salesApp = new Vue({
  el: '#salesMain',
data: {

    sales: {

          businessSegment: '',
          percentOfRevenue: '',
          quarter1Revenue: null,
          quarter2Revenue: null,
          quarter3Revenue: null,
          quarter4Revenue: null,
          profitMargin: ''

},

  DistributionArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }],

  EnginesArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }],
  FiltrationArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }],
  PowerGenerationArr: [{

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }]
},

    methods: {
      fetchAll(){
        this.fetchEngines();
        this.fetchFiltration();
        this.fetchDistribution();
        this.fetchPowerGeneration();
      //  this.buildSalesChart();
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
         this.buildSalesChart();
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
                  'Quarter 1',
                  'Quarter 2',
                  'Quarter 3',
                  'Quarter 4',

              ],
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Revenue by Quarter in Millions'
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
              name: 'Distribution',
              data: this.DistributionArr.map( item => [item.DistributionArr.quarter1Revenue, this.DistributionArr.quarter2Revenue, this.DistributionArr.quarter3Revenue, this.DistributionArr.quarter4Revenue])

          }, {
              name: 'Filtration',
              data: this.FiltrationArr.map( item => [item.FiltrationArr.quarter1Revenue, this.FiltrationArr.quarter2Revenue, this.FiltrationArr.quarter3Revenue, this.FiltrationArr.quarter4Revenue])

          }, {
              name: 'Engines',
              data: this.EnginesArr.map( item => [item.EnginesArr.quarter1Revenue, this.EnginesArr.quarter2Revenue, this.EnginesArr.quarter3Revenue, this.EnginesArr.quarter4Revenue])

          }, {
              name: 'Power Generation',
              data: this.PowerGenerationArr.map( item => [item.PowerGenerationArr.quarter1Revenue, this.PowerGenerationArr.quarter2Revenue, this.PowerGenerationArr.quarter3Revenue, this.PowerGenerationArr.quarter4Revenue])

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
