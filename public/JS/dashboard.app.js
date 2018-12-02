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

        this.buildOutputChart();
      },




        buildOutputChart() {
          Highcharts.chart('OutputChart', {
            title: {
              text: 'ENGINE METRICS'
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: 'output'
              }
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              area: {
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
                },
                marker: {
                  radius: 2
                },
                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                threshold: null
              }
            },

            series: [{
              type: 'area',
              name: 'Sensor Output',
              // Data needs [ [date, num], [date2, num2 ], ... ]
              data: this.dataArr.map( item => [item.dataCollectedDate, item.output] )
            }]
          });
        },
      },

  created () {


   fetch('api/dashboard.php')
   .then( response => response.json() )
   .then( json => {dashboardApp.dashboardArr = json} )
   .catch( err => {
     console.error('METRIC FETCH ERROR:');
     console.error(err);
   }),

   this.getData();
 }
});
