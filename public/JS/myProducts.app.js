var myProductsApp = new Vue ({
  el: '#myProductsMain',
  data: {
    myProducts: {

      customerId: '',
      serialNumber: '',
      productName: '',
      purchaseId: ''

    }


  },

  computed: {},

  methods: {
    getAllProducts (){
      fetch('api/myproducts.php')
      .then( response => response.json() ) // "a => expression" is shorthand function declaration
      .then( json => {
        myProductsApp.myProducts = json;
        // TODO: Build out client chart

      })
  .catch( err => {
    console.log('SITE LIST FETCH ERROR:');
    console.log(err);
  })
  },

  },
  created () {

  // Do data fetch
  fetch('api/myproducts.php')
  .then( response => response.json() )
  .then( json => {myproductsApp.myProducts = json} )
  .catch( err => {
  console.error('SITE FETCH ERROR:');
  console.error(err);
  })
  }

})
