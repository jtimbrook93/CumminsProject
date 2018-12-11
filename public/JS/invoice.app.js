var invoiceApp = new Vue({
  el: '#invoiceMain',
data: {

customerNameValue: '',

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
      },

      displayInvoiceReport(name){
        fetch('api/invoicebyCustomer.php?customerName='+name)
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
        .then( json => {
          console.log(json);
          customerApp.invoiceArr = json;
            window.open('Invoice.html?customerName='+document.getElementById('customerName').value)
            })
          .catch( err => {
            console.log('METRIC LIST FETCH ERROR:');
            console.log(err);
          });

      }
      },

      created () {


        const url = new URL(window.location.href);
        const name = url.searchParams.get('customerName') || '';

        this.customerNameValue = name;

        // Do data fetch
        this.fetchAll();
      }
    });
