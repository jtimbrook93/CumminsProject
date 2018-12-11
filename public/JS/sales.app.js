var salesApp = new Vue({
  el: '#salesMain',
data: {

    sales: {

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: '',
    quarter2Revenue: '',
    quarter3Revenue: '',
    quarter4Revenue: '',
    profitMargin: '',

  },

  salesArr: []
},

    methods: {
      fetchAll() {
        fetch('api/sales.php')
        .then( response => response.json() )
        .then( json => {
          salesApp.sales = json;
         this.buildSalesChart();  } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        })
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
        categories: ['Quarter 1 Revenue', 'Quarter 2 Revenue', 'Quarter 3 Revenue', 'Quarter 4 Revenue']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percent of Revenue'
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
        data: this.sales.map( item => [item.quarter1Revenue])
      },{
        name: 'Engines',
        data:  this.sales.map( item => [item.quarter2Revenue])
    }, {
        name: 'Filtration',
        data:  this.sales.map( item => [item.quarter3Revenue])
        },{
        name: '',
        data:  this.sales.map( item => [item.quarter4Revenue])
        }
      ]
    });

}
},


      created() {

        // Do data fetch
        this.fetchAll();

      }
    });
