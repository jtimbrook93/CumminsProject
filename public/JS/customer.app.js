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

      displayCustomerReport(id){
        fetch('api/customer.php?Id='+id)
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
        .then( json => {
          dashboardApp.dataCustomer = json;  })
          window.open('?customerId='+id)
          .catch( err => {
            console.log('METRIC LIST FETCH ERROR:');
            console.log(err);
          });

        },
      },

      created () {

        const url = new URL(window.location.href);
        const id = url.searchParams.get('Id') || 0;
        
        this.customerIdValue = id;

        // Do data fetch
        this.displayCustomerReport();
      }
    });