var digitalProductApp = new Vue({
  el: '#digitalProductContainer',
  data: {
    project: {
      name : '',
      short_description: '',
      start_date : '',
      target_date : '',
      budget : '',
      spent : '',
      projected_spend: '',
      weekly_effort_target: ''
    },
    tasks: [
      {
        id: 0,
        title: '',
        type : '',
        size : '',
        team : '',
        status: '',
        start_date: '',
        close_date: null,
        hours_worked: '',
        perc_complete: '',
        current_sprint : ''
      }
    ]
  },
  computed: {
    days_left: function () {
      return moment(this.project.target_date).diff(moment(), 'days')
    }
  },
  methods: {
    pretty_date: function (d) {
      return moment(d).format('l')
    },
    pretty_currency: function (val) {
      if (val < 1e3) {
        return '$ ' + val
      }

      if (val < 1e6) {
        return '$ ' + (val/1e3).toFixed(1) + ' k'
      }

      return '$ ' + (val/1e6).toFixed(1) + ' M'
    },
    completeClass: function(task) {
      if (task.perc_complete == 100 ) {
        return 'alert-success'
      }
      if (task.current_sprint && task.hours_worked == 0 ) {
        return 'alert-warning'
      }
    },
    fetchTasks (pid) {
      fetch('https://raw.githubusercontent.com/tag/iu-msis/dev/app/data/p1-tasks.json')
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {digitalProductApp.tasks = json} )
      .catch( err => {
        console.log('TASK FETCH ERROR:');
        console.log(err);
      })
    },
    fetchProject (pid) {
      fetch('https://raw.githubusercontent.com/tag/iu-msis/dev/app/data/project1.json')
      .then( response => response.json() )
      .then( json => {digitalProductApp.project = json} )
      .catch( err => {
        console.log('PROJECT FETCH ERROR:');
        console.log(err);
      })
    },
    fetchProjectWork (pid) {
      fetch('api/workHours.php?projectId='+pid)
      .then( response => response.json() )  // "a => expression" is shorthand function declaration
      .then( json => {
        digitalProductApp.workHours = json;
        this.formatWorkHours();
        this.buildEffortChart();
        this.buildBurndownChart();
        this.buildGaugeChart();
        this.buildPercentageChart();
      } )
      .catch( err => {
        console.log('PROJECT WORK FETCH ERROR:');
        console.log(err);
      })
    },
    formatWorkHours() {
      this.workHours.forEach(
        (entry, index, arr) => {
          entry.date = Date.parse(entry.date); // Convert to ms since Jan 1, 1970 UTC
          entry.hours = Number(entry.hours);
          entry.runningTotalHours = entry.hours +
            (index == 0 ? 0 : arr[index-1].runningTotalHours)
      });

      // DEBUG: Make sure the data is how we want it:
      console.log(this.workHours);
    },
    buildEffortChart() {
      Highcharts.chart('effortChart', {
            title: {
                text: 'Cumulative Project Effort'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Hours'
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
                name: 'Hours (Running Total)',
                // Data needs [ [date, num], [date2, num2 ], ... ]
                data: this.workHours.map( item => [item.date, item.runningTotalHours] )
            }]
        });
    },
    buildBurndownChart(){
          Highcharts.chart('burndownChart', {
              title: {
                text: 'Burndown Chart',
                x: -20 //center
              },
              colors: ['blue', 'red'],
              plotOptions: {
                line: {
                  lineWidth: 3
                },
                tooltip: {
                  hideDelay: 200
                }
              },
              subtitle: {
                text: 'Sprint 1',
                x: -20
              },
              xAxis: {
                categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
                             'Day 7', 'Day 8', 'Day 9', 'Day 10']
              },
              yAxis: {
                title: {
                  text: 'Hours'
                },
                plotLines: [{
                  value: 0,
                  width: 1
                }]
              },
              tooltip: {
                valueSuffix: ' hrs',
                crosshairs: true,
                shared: true
              },
              legend: {
                layout: 'horizontal',
                align: 'middle',
              //  verticalAlign: 'middle',
                borderWidth: 0
              },
              series: [{
                name: 'Ideal Burn',
                color: 'rgba(255,0,0,0.25)',
                lineWidth: 2,
                data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
              }, {
                name: 'Actual Burn',
                color: 'rgba(0,120,200,0.75)',
                marker: {
                  radius: 6
                },
                data: [100, 110, 85, 60, 60, 30, 32, 23, 9, 2]
              }]
            });

    },
    buildGaugeChart(){
    Highcharts.chart('gaugeChart', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'Project Health'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 200,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Tasks Left'
        },
        plotBands: [{
            from: 0,
            to: 120,
            color: '#55BF3B' // green
        }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
        }, {
            from: 160,
            to: 200,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Tasks Left',
        data: [80]
      }]

});
},
buildPercentageChart(){

  Highcharts.chart('percentageChart', {

      chart: {
          type: 'solidgauge',
          height: '110%',
          events: {
              render: renderIcons
          }
      },

      title: {
          text: 'Activity',
          style: {
              fontSize: '24px'
          }
      },

      tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
              fontSize: '16px'
          },
          pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
          positioner: function (labelWidth) {
              return {
                  x: (this.chart.chartWidth - labelWidth) / 2,
                  y: (this.chart.plotHeight / 2) + 15
              };
          }
      },

      pane: {
          startAngle: 0,
          endAngle: 360,
          background: [{ // Track for Move
              outerRadius: '112%',
              innerRadius: '88%',
              backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                  .setOpacity(0.3)
                  .get(),
              borderWidth: 0
          }, { // Track for Exercise
              outerRadius: '87%',
              innerRadius: '63%',
              backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                  .setOpacity(0.3)
                  .get(),
              borderWidth: 0
          }, { // Track for Stand
              outerRadius: '62%',
              innerRadius: '38%',
              backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
                  .setOpacity(0.3)
                  .get(),
              borderWidth: 0
          }]
      },

      yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
      },

      plotOptions: {
          solidgauge: {
              dataLabels: {
                  enabled: false
              },
              linecap: 'round',
              stickyTracking: false,
              rounded: true
          }
      },

      series: [{
          name: 'Tasks',
          data: [{
              color: Highcharts.getOptions().colors[0],
              radius: '112%',
              innerRadius: '88%',
              y: 80
          }]
      }, {
          name: 'Errors',
          data: [{
              color: Highcharts.getOptions().colors[1],
              radius: '87%',
              innerRadius: '63%',
              y: 65
          }]
      }, {
          name: 'Deployments',
          data: [{
              color: Highcharts.getOptions().colors[2],
              radius: '62%',
              innerRadius: '38%',
              y: 50
          }]
      }]
  });
},


    gotoTask(tid) {
      window.location = 'task.html?taskId=' + tid;
    }
  },
  created () {
    // Get URL Param, projectId
    const url = new URL(window.location.href);
    const projectId = url.searchParams.get('projectId') || 0;

    if (!projectId) {
      console.error('Project Id not defined in URL parameters.')
    }

    this.project.id = projectId;
    this.fetchProject(projectId);
    this.fetchTasks(projectId);
    this.fetchProjectWork(projectId);
    //this.buildBurndownChart();
    //this.buildGaugeChart();
  }
});
