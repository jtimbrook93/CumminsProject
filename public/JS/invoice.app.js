var invoiceApp = new Vue({
  el: '#invoiceMain',
data: {

  invoices: {

    invoiceNumber: '',
    createdDate: '',
    orderStatus: '',
    customerName: '',
    dueDate: '',
    serviceLine: '',
    invoiceAmount: ''
  },

  invoiceArr: []
},

    methods: {
      fetchAll() {
        fetch('api/invoice.php')
        .then( response => response.json() )
        .then( json => {
          invoiceApp.invoices = json;
        } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        })
      }
      },

      created () {

        // Do data fetch
        this.fetchAll();
      }
    });
