var dashboardApp = new Vue ({
  el: '#dashboardcontainer',
  data: {

    metrics: {

      serialNumber: '',
      dateCollected: '',
      airMassFlowRate: '',
      fuelMassFlowRate: '',
      drag: '',
      thrust: '',
      fuelBurned: '',
      fuelEfficiency: '',
      noxLevels: '',
      momentumChangeAMF: '',
      momentumChangeFMF: '',
      energyBalance: '',
      propulsiveEfficiency: '',
      thermalEfficiency: ''

    },

    dataArr: []


  },
  computed: {

  },

  methods: {

    getData(){
      fetch('api/dashboard.php')
      .then( response => response.json() )  // "a => expression" is shorthand function declaration
      .then( json => { dashboardApp.dataArr = json; } )
        .catch( err => {
          console.log('METRIC LIST FETCH ERROR:');
          console.log(err);
        })

      },


    // Vue.use(VueHighcharts);
    //
    //   var options = {
    //     title: {
    //       text: 'Monthly Average Temperature',
    //       x: -20 //center
    //     },
    //     subtitle: {
    //       text: 'Source: WorldClimate.com',
    //       x: -20
    //     },
    //     xAxis: {
    //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    //       ]
    //     },
    //     yAxis: {
    //       title: {
    //         text: 'Temperature (°C)'
    //       },
    //       plotLines: [{
    //         value: 0,
    //         width: 1,
    //         color: '#808080'
    //       }]
    //     },
    //     tooltip: {
    //       valueSuffix: '°C'
    //     },
    //     legend: {
    //       layout: 'vertical',
    //       align: 'right',
    //       verticalAlign: 'middle',
    //       borderWidth: 0
    //     },
    //     series: [{
    //       name: 'Tokyo',
    //       data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }, {
    //       name: 'New York',
    //       data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    //     }, {
    //       name: 'Berlin',
    //       data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    //     }, {
    //       name: 'London',
    //       data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }]
    //   };
    //
    //   var vm = new Vue({
    //     el: '#app',
    //     data: {
    //       options: options
    //     },
    //     methods: {
    //       updateCredits: function() {
    //           var chart = this.$refs.highcharts.chart;
    //         chart.credits.update({
    //           style: {
    //             color: '#' + (Math.random() * 0xffffff | 0).toString(16)
    //           }
    //         });
    //       }
    //     }
    //   });



      this:$(function() {

      //create a variable so we can pass the value dynamically
      var chartype = 'line';
      var chartTitle = 'Engine Metirics';
      var chartCategories = this.dataArr.map( item => [item.dateCollected]);
      var chartData = [{
      name: 'Year 1800',
      data: [107, 31, 635, 203, 2]
      }, {
      name: 'Year 1900',
      data: [133, 156, 947, 408, 6]
      }, {
      name: 'Year 2008',
      data: [973, 914, 4054, 732, 34]
      }];

      //On page load call the function setDynamicChart
      this.setDynamicChart(chartype, chartTitle, chartCategories, chartData);

      //jQuery part - On Click call the function setDynamicChart(dynval) and pass the chart type
      $("#chartType").change(function() {
      //get the value from 'a' tag
      var chartype = this.value;
      setDynamicChart(chartype, chartTitle, chartCategories, chartData);
      });

      $("#data").change(function() {
      //get the value from 'a' tag
      var data = this.value;

      if (data == 'airMassFlowRate') {
        chartype = chartype;
        chartTitle = 'Air Mass Flow Rate';
        chartCategories = this.dataArr.map( item => [item.dateCollected]);
        chartData = [{
          name: 'Meters/Second',
          data: this.dataArr.map( item => [item.airMassFlowRate])
        }];

        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        } else if (data == 'fuelMassFlowRate') {
        chartTitle = 'Fuel Mass Flow Rate';
        chartCategories =  this.dataArr.map( item => [item.dateCollected]);
        chartData = [{
          name: 'Meters/Second',
          data: this.dataArr.map( item => [item.fuelMassFlowRate])
        }];

        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        } else if (data == 'fuelEfficiency') {
        chartTitle = 'Fuel Efficiency';
        chartCategories =  this.dataArr.map( item => [item.dateCollected]);
        chartData = [{
          name: 'Percent',
          data: this.dataArr.map( item => [item.fuelEfficiency])
        }];

        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        // } else if (data == 'data4') {
        // chartTitle = 'Monthly Average Temperature';
        // chartData = [{
        //   type: 'pie',
        //   name: 'Browser share',
        //   data: [
        //     ['Firefox', 45.0],
        //     ['IE', 26.8], {
        //       name: 'Chrome',
        //       y: 12.8,
        //       sliced: true,
        //       selected: true
        //     },
        //     ['Safari', 8.5],
        //     ['Opera', 6.2],
        //     ['Others', 0.7]
        //   ]
        // }];
        // setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        }
      });

      //function is created so we pass the value dynamically and be able to refresh the HighCharts on every click

      function setDynamicChart(chartype, chartTitle, chartCategories, chartData) {
      $('#grafiek_bench_rendement').highcharts({
        chart: {
          type: chartype
        },
        title: {
          text: chartTitle
        },
        xAxis: {
          categories: chartCategories
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Engine Metrics'
          }
        },
        plotOptions: {
          //this need only for pie chart
          pie: {
            allowPointSelect: true,
            cursor: 'pointer'
          }
        },
        series: chartData
      });
      }
      })
    },



  created () {


   // fetch('api/dashboard.php')
   // .then( response => response.json() )
   // .then( json => {dashboardApp.dataArr = json} )
   // .catch( err => {
   //   console.error('METRIC FETCH ERROR:');
   //   console.error(err);
   // }),

    this.getData();
    this.setDynamicChart(chartype, chartTitle, chartCategories, chartData);
 }
});
