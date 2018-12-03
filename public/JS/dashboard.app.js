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


      this.$(function() {

      //create a variable so we can pass the value dynamically
      var chartype = 'line';
      var chartTitle = 'Browser Chart';
      var chartCategories = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
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
        chartCategories = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
        chartData = [{
          name: 'Meters/Second',
          data: this.dataArr.map( item => [item.dateCollected, item.airMassFlowRate])
        }];

        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        } else if (data == 'fuelMassFlowRate') {
        chartTitle = 'Fuel Mass Flow Rate';
        chartCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        chartData = [{
          name: 'Meters/Second',
          data: this.dataArr.map( item => [item.dateCollected, item.fuelMassFlowRate])
        }];

        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        } else if (data == 'fuelEfficiency') {
        chartTitle = 'Fuel Efficiency';
        chartCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        chartData = [{
          name: 'Percent',
          data: this.dataArr.map( item => [item.dateCollected, item.fuelEfficiency])
        }];

        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
        } else if (data == 'data4') {
        chartTitle = 'Monthly Average Temperature';
        chartData = [{
          type: 'pie',
          name: 'Browser share',
          data: [
            ['Firefox', 45.0],
            ['IE', 26.8], {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
            },
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
          ]
        }];
        setDynamicChart(chartype, chartTitle, chartCategories, chartData);
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


   fetch('api/dashboard.php')
   .then( response => response.json() )
   .then( json => {dashboardApp.dataArr = json} )
   .catch( err => {
     console.error('METRIC FETCH ERROR:');
     console.error(err);
   }),

    this.getData();
     this.buildOutputChart();

      this.setDynamicChart(chartype, chartTitle, chartCategories, chartData);
 }
});
