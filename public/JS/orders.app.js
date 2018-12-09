var ordersApp = new Vue({
  el: '#ordersMain',
data: {

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
      }
      },

      created () {

        // Do data fetch
        this.fetchAll();
      }
    });
