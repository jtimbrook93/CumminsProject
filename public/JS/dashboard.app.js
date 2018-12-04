var dashboardApp = new Vue ({
  el: '#dashboardcontainer',
  data: {

    dataValue: '',

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

    dataArr: [],


  },
  computed: {

  },

  methods: {

    getData(){
      fetch('api/dashboard.php')
      .then( response => response.json() )  // "a => expression" is shorthand function declaration
      .then( json => {
        dashboardApp.dataArr = json;  } )
        .catch( err => {
          console.log('METRIC LIST FETCH ERROR:');
          console.log(err);
        });

        this.formatDate();
      },

      valueChange(){
        console.log(dashboardApp.dataValue);
        this.buildChart();
      },

      formatDate(){
        this.dataArr.forEach(
          function(entry) {
            entry.dateCollected = Date.parse(entry.dateCollected); // Convert to ms since Jan 1, 1970 UTC

          });
        },

        pretty_date: function (d) {
          return moment(d).format('l')

        },
        buildChart(){
          Highcharts.chart('grafiek_bench_rendement', {

            title: {
              text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
              text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
              title: {
                text: 'Number of Employees'
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },

            plotOptions: {
              series: {
                label: {
                  connectorAllowed: false
                },
                pointStart: 2010
              }
            },
            series: this.getSeries(),
            responsive: {
              rules: [{
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                  }
                }
              }]
            }

          });
        } ,

        getSeries(){
          var series = [];
          if(this.dataValue=='airMassFlowRate')
          {
            series = [{name: 'airMassFlowRate', data: dashboardApp.dataArr.airMassFlowRate}]
          }
          else if(this.dataValue=='fuelMassFlowRate')
          {
            series = [{name: 'fuelMassFlowRate', data: dashboardApp.metrics.fuelMassFlowRate}]
          }
          else if(this.dataValue == "drag")
          {
            series = [{name: 'drag', data: this.metrics.drag}]
          }
          else if(this.dataValue=='thrust')
          {
          series = [{name: 'thrust', data: this.metrics.thrust}]
          }
          else if(this.dataValue == "fuelBurned")
         {
          series = [{name: 'fuelBurned', data: this.metrics.fuelBurned}]
          }
          else if(this.dataValue=='fuelEfficiency')
          {
            series = [{name: 'fuelEfficiency', data: this.metrics.fuelEfficiency}]
          }
          else if(this.dataValue == "noxLevels")
          {
            series = [{name: 'noxLevels', data: this.metrics.noxLevels}]
          }
          else if(this.dataValue=='momentumChangeAMF')
          {
          series = [{name: 'momentumChangeAMF', data: this.metrics.momentumChangeAMF}]
          }
          else if(this.dataValue == "momentumChangeFMF")
         {
          series = [{name: 'momentumChangeFMF', data: this.metrics.momentumChangeFMF}]
          }
          else if(this.dataValue=='energyBalance')
          {
          series = [{name: 'energyBalance', data: this.metrics.energyBalance}]
          }
          else if(this.dataValue == "propulsiveEfficiency")
         {
          series = [{name: 'propulsiveEfficiency', data: this.metrics.propulsiveEfficiency}]
          }
          else if(this.dataValue=='thermalEfficiency')
          {
            series = [{name: 'thermalEfficiency', data: this.metrics.thermalEfficiency}]
          }
          return series;
      },

},

      created () {

        this.formatDate();
        this.getData();
        this.getSeries();
        this.buildChart();
      }
    });
