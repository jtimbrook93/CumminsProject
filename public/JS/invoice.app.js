var invoiceApp = new Vue({
  el: '#invoiceMain',
data: {

customerNameValue: '',
tempName: '',

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
        fetch('api/invoiceByCustomer.php?customerName='+document.getElementById('customerName').value)
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
        .then( json => {
          console.log(this.customerNameValue);
          invoiceApp.invoices = json;
          console.log(this.invoices);
            // window.open('InvoiceByCustomer.html?customerName='+document.getElementById('customerName').value)
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
