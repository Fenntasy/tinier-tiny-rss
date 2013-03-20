window.TTRSS = new (Backbone.Router.extend({
  routes: {
    "": "index",
    "cat/:id": "show"
  },

  initialize: function(){
    this.categories = new Categories();
    this.categoriesView = new CategoriesView({collection: this.categories});
    this.categoriesView.render();
  },

  index: function(){
    $('#categories').html(this.categoriesView.el);
    this.categories.fetch();
  },

  start: function(){
    Backbone.history.start();
  },

  show: function(id){
    console.log(id);
  }
}));