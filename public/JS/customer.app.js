var customerApp = new Vue({
  el: '#customerMain',
data: {

    customerIdValue: '',

  customers: {

    Id: '',
    customerName: '',
    customerSince: '',
    primaryContactName: '',
    primaryContactNumber: ''
  },

  dataCustomer: []
},

    methods: {


      displayCustomers(){
        fetch('api/customer.php')
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
        .then( json => {
          console.log(json);
          customerApp.customers = json;
          //  window.open('CustomerReport.html?Id='+document.getElementById('customerId').value)
          })
          .catch( err => {
            console.log('METRIC LIST FETCH ERROR:');
            console.log(err);
          });

        },


      displayCustomerReport(id){
        fetch('api/customerById.php?Id='+document.getElementById('customerId').value)
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
        .then( json => {
          console.log(this.customerIdValue);
          customerApp.customers = json;
          //  window.open('CustomerReport.html?Id='+document.getElementById('customerId').value)
          })
          .catch( err => {
            console.log('METRIC LIST FETCH ERROR:');
            console.log(err);
          });

        },
      },

      created () {


        this.displayCustomers();
        
        const url = new URL(window.location.href);
        const id = url.searchParams.get('Id') || 0;

        this.customerIdValue = id;


        // Do data fetch
      //  this.displayCustomers();
      }
    });
