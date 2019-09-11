var myProductsApp = new Vue ({

  el: '#myProductsMain',

  data: {
    myProducts: {

      customerId: '',
      serialNumber: '',
      productName: '',
      purchaseId: ''
    },

    moreData: {

      dateStart: '',
      estimatedFinish: '',
      processStep: '',
      contactName: '',
      employeeId: ''

    },


myProductsArr: []

  },

  computed: {},

  methods: {

    getAllProducts(cid) {
    fetch('api/myproducts.php?customerId='+cid)
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
  getAllRepairs(){
    fetch('api/repairs.php')
    .then( response => response.json() )  // "a => expression" is shorthand function declaration
  .then( json => {
    myProductsApp.moreData = json;
    //  TODO: Build out client chart

  } )
  .catch( err => {
    console.log('CLIENT LIST FETCH ERROR:');
    console.log(err);
  })
},

  },
  created() {

    const url = new URL(window.location.href);
    const cid = url.searchParams.get('customerId') || 4501;

  // Do data fetch
  fetch('api/myproducts.php?customerId='+cid)
  .then( response => response.json() )
  .then( json => {myProductsApp.myProducts = json} )
  .catch( err => { console.error('MY PRODUCTS FETCH ERROR:');
  console.error(err);
  })

  fetch('api/repairs.php')
  .then( response => response.json() )  // "a => expression" is shorthand function declaration
.then( json => {
  myProductsApp.moreData = json;
  //  TODO: Build out client chart

} )
}

})
