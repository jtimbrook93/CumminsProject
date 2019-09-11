var ordersApp = new Vue({
  el: '#ordersMain',
data: {

  customerIdValue: '',

  orders: {

    serialNumber: '',
    customerId: '',
    productName: '',
    productType: '',
    productApplication: '',
    digitalProduct: '',
    horsepower: '',
    torque: '',
    classification: '',
    size: '',
    orderStatus: ''

  },

  ordersArr: []
},

    methods: {

      fetchAll() {
        fetch('api/orders.php')
        .then( response => response.json() )
        .then( json => {
          ordersApp.orders = json;
        } )
        .catch( err => {
          console.log('PRODUCT FETCH ERROR:');
          console.log(err);
        })
      },
      getOrdersByCustomer(id){
        fetch('api/ordersByCustomer.php?customerId='+id)
        .then( response => response.json() )  // "a => expression" is shorthand function declaration
      .then( json => {
        ordersApp.orders = json;
          //window.open('OrdersByCustomer.html?customerId='+document.getElementById('customerId').value)
      } )
      .catch( err => {
        console.log('CLIENT LIST FETCH ERROR:');
        console.log(err);
      });

    },

    customerChange(){
      console.log(ordersApp.customerIdValue);
      this.getOrdersByCustomer(ordersApp.customerIdValue);
    }
    },

      created () {

        const url = new URL(window.location.href);
        const id = url.searchParams.get('customerId') || 0;

          this.customerIdValue = id;


        // Do data fetch
        this.fetchAll();
      }
    });
