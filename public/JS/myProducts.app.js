var myProductsApp = new Vue ({

  el: '#myProductsMain',

  data: {
    myProducts: {

      customerId: '',
      serialNumber: '',
      productName: '',
      purchaseId: ''

    },
    
myProductsArr: []

  },

  computed: {},

  methods: {

    getAllProducts() {
      fetch('api/myproducts.php')
      .then( response => response.json() ) // "a => expression" is shorthand function declaration
      .then( json => {
        myProductsApp.myProducts = json;
        // TODO: Build out client chart
      })
  .catch( err => {
    console.log('MY PRODUCT LIST FETCH ERROR:');
    console.log(err);
  })
  },

  },
  created () {

  // Do data fetch
  fetch('api/myproducts.php')
  .then( response => response.json() )
  .then( json => {myProductsApp.myProducts = json} )
  .catch( err => { console.error('MY PRODUCTS FETCH ERROR:');
  console.error(err);
  })
  }

})