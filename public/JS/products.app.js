var productsApp = new Vue({
  el: '#productMain',
data: {

  products: {

    serialNumber: '',
    productName: '',
    productType: '',
    productApplication: '',
    digitalProduct: '',
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
          productsApp.productsArr = json;
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
