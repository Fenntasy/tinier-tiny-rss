var CategoriesView = Backbone.View.extend({
    initialize: function(){
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.addAll, this);
    },
    render: function(){
        this.addAll();
        return this;
    },

    addAll: function(){
        this.$el.empty();
        this.collection.forEach(this.addOne, this);
    },

    addOne: function(category){
        var category = new CategoryView({model: category});
        this.$el.append(category.render().el);
    }
});