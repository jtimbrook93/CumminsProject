var repairsApp = new Vue({
  el: '#repairscontainer',
data: {

  customerIdValue: '',

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

  getRepairsByCustomer(id){
    fetch('api/repairsByCustomer.php?customerId='+id)
    .then( response => response.json() )  // "a => expression" is shorthand function declaration
  .then( json => {
    repairsApp.repairsArr = json;
      window.open('repairByCustomer.html?customerId='+document.getElementById('customerId').value)
  } )
  .catch( err => {
    console.log('CLIENT LIST FETCH ERROR:');
    console.log(err);
  });

},

customerChange(){
  console.log(repairsApp.customerIdValue);
  this.getRepairsByCustomer(repairsApp.customerIdValue);
}
},

  created () {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('customerId') || 0;

      this.customerIdValue = id;
    // Do data fetch
  this.getAllRepairs();
  }
})
