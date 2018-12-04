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
              text: 'Engine Diognostics Report'
            },

            subtitle: {
              text: 'Lifetime statistics'
            },
            xAxis: {
                  type: 'datetime'
            },
            yAxis: {
              title: {
                text: this.getName()
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
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
            series:  
              this.getSeries(),

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
      },

        getSeries(){
          var series = [];
          if(this.dataValue=='airMassFlowRate')
          {
            series = [{name: 'airMassFlowRate', data: this.dataArr.map( item => [item.dateCollected, item.airMassFlowRate])}]
          }
          else if(this.dataValue=='fuelMassFlowRate')
          {
            series = [{name: 'fuelMassFlowRate', data: this.dataArr.map( item => [item.dateCollected, item.fuelMassFlowRate])}]
          }
          else if(this.dataValue == "drag")
          {
            series = [{name: 'drag', data: this.dataArr.map( item => [item.dateCollected, item.drag])}]
          }
          else if(this.dataValue=='thrust')
          {
          series = [{name: 'thrust', data: this.dataArr.map( item => [item.dateCollected, item.thrust])}]
          }
          else if(this.dataValue == "fuelBurned")
         {
          series = [{name: 'fuelBurned', data: this.dataArr.map( item => [item.dateCollected, item.fuelBurned])}]
          }
          else if(this.dataValue=='fuelEfficiency')
          {
            series = [{name: 'fuelEfficiency', data: this.dataArr.map( item => [item.dateCollected, item.fuelEfficiency])}]
          }
          else if(this.dataValue == "noxLevels")
          {
            series = [{name: 'noxLevels', data: this.dataArr.map( item => [item.dateCollected, item.noxLevels])}]
          }
          else if(this.dataValue=='momentumChangeAMF')
          {
          series = [{name: 'momentumChangeAMF', data: this.dataArr.map( item => [item.dateCollected, item.momentumChangeAMF])}]
          }
          else if(this.dataValue == "momentumChangeFMF")
         {
          series = [{name: 'momentumChangeFMF', data: this.dataArr.map( item => [item.dateCollected, item.momentumChangeFMF])}]
          }
          else if(this.dataValue=='energyBalance')
          {
          series = [{name: 'energyBalance', data: this.dataArr.map( item => [item.dateCollected, item.energyBalance])}]
          }
          else if(this.dataValue == "propulsiveEfficiency")
         {
          series = [{name: 'propulsiveEfficiency', data: this.dataArr.map( item => [item.dateCollected, item.propulsiveEfficiency])}]
          }
          else if(this.dataValue=='thermalEfficiency')
          {
            series = [{name: 'thermalEfficiency', data: this.dataArr.map( item => [item.dateCollected, item.thermalEfficiency])}]
          }
          return series;
      },

      getName(){
        var name = [];
        if(this.dataValue=='airMassFlowRate')
        {
          name = 'Air Mass Flow Rate'
        }
        else if(this.dataValue=='fuelMassFlowRate')
        {
          name = 'Fuel Mass Flow Rate'
        }
        else if(this.dataValue == "drag")
        {
          name = 'Drag'
        }
        else if(this.dataValue=='thrust')
        {
          name = 'Thrust'
        }
        else if(this.dataValue == "fuelBurned")
        {
          name = 'Fuel Burned'
        }
        else if(this.dataValue=='fuelEfficiency')
        {
          name = 'Fuel Efficiency'
        }
        else if(this.dataValue == "noxLevels")
        {
          name = 'NOx Levels'
        }
        else if(this.dataValue=='momentumChangeAMF')
        {
          name = 'Momentum Change AMF'
        }
        else if(this.dataValue == "momentumChangeFMF")
        {
          name = 'Momentum Change FMF'
        }
        else if(this.dataValue=='energyBalance')
        {
          name = 'Energy Balance'
        }
        else if(this.dataValue == "propulsiveEfficiency")
        {
          name = 'Propultive Efficiency'
        }
        else if(this.dataValue=='thermalEfficiency')
        {
          name = 'Thermal Efficiency'
        }
        return name;
    }

},

      created () {

        this.formatDate();
        this.getData();
        this.getSeries();
        this.getName()
        this.buildChart();
      }
    });
