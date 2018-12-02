var repairsApp = new Vue({
  el: '#repairscontainer',
data: {

  repairs: {

    repairID: '',
    serialNumber: '',
    customerId: '',
    dateProcessed: '',
    dateStart: '',
    estimatedFinish: '',
    processStep: '',
    contactName: '',
    employeeId: ''
},

repairsArr:[]

},

computed: {

  },

  methods: {
    getAllRepairs(){
      fetch('api/repairs.php')
      .then( response => response.json() )  // "a => expression" is shorthand function declaration
    .then( json => {
      repairsApp.repairs = json;
      //  TODO: Build out client chart

    } )
    .catch( err => {
      console.log('CLIENT LIST FETCH ERROR:');
      console.log(err);
    })
  },
  },

  created () {

    // Do data fetch
    fetch('api/repairs.php')
    .then( response => response.json() )
    .then( json => {repairsApp.repairs = json} )
    .catch( err => {
      console.error('CLIENT FETCH ERROR:');
      console.error(err);
    })
  }
})
