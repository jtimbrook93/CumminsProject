var dashboardApp = new Vue ({
  el: '#dashboardcontainer',
  data: {

    dataValue: '',
    productValue: '',
    serialNumberValue: '',
    tempCid: '',
    customerIdValue: '',

    metrics: {

      customerId: '',
      productName: '',
      purchaseId: '',
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

    dataArr2: [],
    dataSerial: []




  },
  computed: {


  },

  methods: {

    getProductName(cid){
      fetch('api/myproducts.php?customerId='+cid)
      .then( response => response.json() )  // "a => expression" is shorthand function declaration
      .then( json => {
        dashboardApp.dataArr = json;  })
        .catch( err => {
          console.log('METRIC LIST FETCH ERROR:');
          console.log(err);
        });

      },

      getSerialNumber(cid, pn){
        fetch('api/serialNumber.php?customerId='+cid +'&productName='+pn)
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
        .then( json => {
          dashboardApp.dataSerial = json;  })
          .catch( err => {
            console.log('METRIC LIST FETCH ERROR:');
            console.log(err);
          });

        },


        getData(cid, pn, sn) {
          fetch('api/dashboard.php?customerId='+cid +'&productName='+pn +'&serialNumber='+sn)
          .then( response => response.json() )  // "a => expression" is shorthand function declaration
          .then( json => {
            dashboardApp.dataArr2 = json;
              this.buildChart();
            } )
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

          productChange(){
            console.log(dashboardApp.productValue);
            this.getSerialNumber(dashboardApp.tempCid, dashboardApp.productValue);
            //this.getData(dashboardApp.tempCid, dashboardApp.productValue, dashboardApp.serialNumberValue);
            //this.buildChart();
          },

          serialNumberChange(){
            console.log(dashboardApp.serialNumberValue);
            this.getData(dashboardApp.tempCid, dashboardApp.productValue, dashboardApp.serialNumberValue);
          },


          formatDate(){
            this.dataArr2.forEach(
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
                      maxWidth: 400
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
                series = [{name: 'airMassFlowRate', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.airMassFlowRate])}]
              }
              else if(this.dataValue=='fuelMassFlowRate')
              {
                series = [{name: 'fuelMassFlowRate', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.fuelMassFlowRate])}]
              }
              else if(this.dataValue == "drag")
              {
                series = [{name: 'drag', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.drag])}]
              }
              else if(this.dataValue=='thrust')
              {
                series = [{name: 'thrust', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.thrust])}]
              }
              else if(this.dataValue == "fuelBurned")
              {
                series = [{name: 'fuelBurned', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.fuelBurned])}]
              }
              else if(this.dataValue=='fuelEfficiency')
              {
                series = [{name: 'fuelEfficiency', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.fuelEfficiency])}]
              }
              else if(this.dataValue == "noxLevels")
              {
                series = [{name: 'noxLevels', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.noxLevels])}]
              }
              else if(this.dataValue=='momentumChangeAMF')
              {
                series = [{name: 'momentumChangeAMF', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.momentumChangeAMF])}]
              }
              else if(this.dataValue == "momentumChangeFMF")
              {
                series = [{name: 'momentumChangeFMF', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.momentumChangeFMF])}]
              }
              else if(this.dataValue=='energyBalance')
              {
                series = [{name: 'energyBalance', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.energyBalance])}]
              }
              else if(this.dataValue == "propulsiveEfficiency")
              {
                series = [{name: 'propulsiveEfficiency', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.propulsiveEfficiency])}]
              }
              else if(this.dataValue=='thermalEfficiency')
              {
                series = [{name: 'thermalEfficiency', data: this.dataArr2.map( item => [Date.parse(item.dateCollected), item.thermalEfficiency])}]
              }
              return series;
            },

            getName(){
              var name = [];
              if(this.dataValue=='airMassFlowRate')
              {
                name = 'Cubic Meter/Sec'
              }
              else if(this.dataValue=='fuelMassFlowRate')
              {
                name = 'Cubic Meter/Sec'
              }
              else if(this.dataValue == "drag")
              {
                name = 'Newtons'
              }
              else if(this.dataValue=='thrust')
              {
                name = 'Newtons'
              }
              else if(this.dataValue == "fuelBurned")
              {
                name = 'Joules'
              }
              else if(this.dataValue=='fuelEfficiency')
              {
                name = 'MPG'
              }
              else if(this.dataValue == "noxLevels")
              {
                name = 'mg/Nm3'
              }
              else if(this.dataValue=='momentumChangeAMF')
              {
                name = 'Kilogram Meters per Second'
              }
              else if(this.dataValue == "momentumChangeFMF")
              {
                name = 'Kilogram Meters per Second'
              }
              else if(this.dataValue=='energyBalance')
              {
                name = 'Joules'
              }
              else if(this.dataValue == "propulsiveEfficiency")
              {
                name = 'Meters/Second'
              }
              else if(this.dataValue=='thermalEfficiency')
              {
                name = 'Joules/kg'
              }
              return name;
            }

          },

          created () {

            const url = new URL(window.location.href);
            const cid = url.searchParams.get('customerId') || 0;
            const pn = url.searchParams.get('productName') || "";
            const sn = url.searchParams.get('serialNumber') || "";
            const id = url.searchParams.get('Id') || 0;

            this.customerIdValue = id;
            this.tempCid = cid;
            this.productValue = pn;
            this.serialNumberValue = sn;

            // this.productCategories ();
            this.getProductName(cid);
            //this.getSerialNumber(cid, pn);
            this.formatDate();
            //this.getData(cid, pn);
            this.getSeries();
            this.getName();

          }
        });
