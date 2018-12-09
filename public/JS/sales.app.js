var salesApp = new Vue({
  el: '#salesMain',
data: {

    sales: {

    businessSegment: '',
    percentOfRevenue: '',
    quarter1Revenue: '',
    quarter2Revenue: '',
    quarter3Revenue: '',
    quarter4Revenue: '',
    profitMargin: '',

  },

  salesArr: []
},

    methods: {
      fetchAll() {
        fetch('api/sales.php')
        .then( response => response.json() )
        .then( json => {
          salesApp.sales = json;
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
