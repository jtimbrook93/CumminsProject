var supportApp = new Vue({
  el: '#supportcontainer',

data: {

},

computed: {

  },

  methods: {
      $(function(){
        $("#addClass").click(function () {
        $('#qnimate').addClass('popup-box-on');
          });

          $("#removeClass").click(function () {
        $('#qnimate').removeClass('popup-box-on');
          });
})
  },

  created () {

    // Do data fetch
  }
});
