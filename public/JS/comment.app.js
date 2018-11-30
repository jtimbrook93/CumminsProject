var commentApp = new Vue({
  el: '#commentContainer',
data: {
  comment: [],

commentForm: {}
},
computed: {

  },
  methods: {
    handleWorkForm(e) {


      // TODO: Check validity
      if (this.commentForm.comment==="") {
        console.error('Cannot submit, invalid values');
        return;
      }


      const s = JSON.stringify(this.commentForm);

      console.log(s);

      //TODO: POST to remote server
      fetch('api/comment.php', {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: s
      })

      .then( response => response.json() )
      .then( json => {
        this.comment.push(json)
      })
      .catch( err => {
        console.error('COMMENT POST ERROR:');
        console.error(err);
      });
      // Reset workForm
      this.commentForm = this.getEmptyWorkForm();
    },

    getEmptyWorkForm() {
      return {
        comment: ''
      }
    }
  },
  created() {

    // Do data fetch
    fetch('api/comment.php')
    .then( response => response.json() )
    .then( json => {commentApp.comment = json} )
    .catch( err => {
      console.error('COMMENT FETCH ERROR:');
      console.error(err);
    })
  }
})
