var productsApp = new Vue({
  el: '#productMain',
data: {
  products: {

    serialNumber: '',
    productName: '',
    productType: '',
    productApplication: '',
    horsepower: '',
    torque: '',
    classification: '',
    size: ''
  },

  productsArr: []
},

    methods: {
      fetchAll() {
        fetch('api/products.php')
        .then( response => response.json() )
        .then( json => {
          productsApp.products = json;
        } )
        .catch( err => {
          console.log('TURBINE LIST FETCH ERROR:');
          console.log(err);
        })
      },
      },

      created () {

        // Do data fetch
        fetch('api/products.php')
        .then( response => response.json() )
        .then( json => {productsApp.products = json} )
        .catch( err => {
          console.error('CLIENT FETCH ERROR:');
          console.error(err);
        })
      }
    });
