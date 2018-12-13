        var salesApp = new Vue({
  el: '#salesMain',
data: {

//     sales: {
//
//           businessSegment: "Jon sucks",
//           percentOfRevenue: '',
//           quarter1Revenue: null,
//           quarter2Revenue: null,
//           quarter3Revenue: null,
//           quarter4Revenue: null,
//           profitMargin: ''
//
// },

  sales: [],

  DistributionArr: [{

    businessSegment: "Jon sucks",
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }],

  EnginesArr: [{

    businessSegment: "Jon sucks",
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }],
  FiltrationArr: [{

    businessSegment: "Jon sucks",
    percentOfRevenue: '',
    quarter1Revenue: null,
    quarter2Revenue: null,
    quarter3Revenue: null,
    quarter4Revenue: null,
    profitMargin: ''

  }],
  PowerGenerationArr: [{

    businessSegment:"Jon sucks",
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
        fetch('api/sales.php')
        .then( response => response.json() )
        .then( json => {
          salesApp.sales = json;
          this.buildSalesChart();
          this.fetchEngines();
          this.fetchFiltration();
          this.fetchDistribution();
          this.fetchPowerGeneration();

         } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        })

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
        text: 'Stacked column chart'
    },
    xAxis: {
        categories: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'Distribution',
        data: [5, 3, 4, 7]
    }, {
        name: 'Filtration',
        data: [2, 2, 3, 2]
    }, {
        name: 'Engines',
        data: [3, 4, 4, 2]
    }]
});
},

  // buildSalesChart() {
  //     Highcharts.chart('salesChart', {
  //         chart: {
  //             type: 'column'
  //         },
  //         title: {
  //             text: 'Revenue by Division'
  //         },
  //
  //         xAxis: {
  //             categories: [
  //                 'Quarter 1',
  //                 'Quarter 2',
  //                 'Quarter 3',
  //                 'Quarter 4',
  //
  //             ],
  //             crosshair: true
  //         },
  //         yAxis: {
  //             min: 0,
  //             title: {
  //                 text: 'Revenue by Quarter in Millions'
  //             }
  //         },
  //         tooltip: {
  //             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  //             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  //                 '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
  //             footerFormat: '</table>',
  //             shared: true,
  //             useHTML: true
  //         },
  //         plotOptions: {
  //                         column: {
  //                      stacking: 'percent'
  //   }
  // },
  //         series: [{
  //             name: 'Distribution',
  //             data: this.DistributionArr.map( entry => [entry.quarter1Revenue, entry.quarter2Revenue, entry.quarter3Revenue, entry.quarter4Revenue])
  //         }, {
  //             name: 'Filtration',
  //             data: this.FiltrationArr.map( entry => [entry.quarter1Revenue, entry.quarter2Revenue, entry.quarter3Revenue, entry.quarter4Revenue])
  //
  //         }, {
  //             name: 'Engines',
  //             data: this.EnginesArr.map( entry => [entry.quarter1Revenue, entry.quarter2Revenue, entry.quarter3Revenue, entry.quarter4Revenue])
  //
  //         }, {
  //             name: 'Power Generation',
  //             data: this.PowerGenerationArr.map( entry => [entry.quarter1Revenue, entry.quarter2Revenue, entry.quarter3Revenue, entry.quarter4Revenue])
  //
  //         }]
  //     });
  //   }
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

},


      created() {

        // const url = new URL(window.location.href);
        // const bs = url.searchParams.get('businessSegment') || '';
        // Do data fetch

        this.fetchAll();
      }
    });
