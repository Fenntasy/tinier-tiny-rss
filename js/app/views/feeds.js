var FeedsView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function(){
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.addAll, this);
    },
    render: function(category_id){
        this.category = category_id;
        this.addAll();
        return this;
    },

    addAll: function(){
        this.$el.empty().addClass("category").attr("id", "cat-" + this.category);
        this.collection.forEach(this.addOne, this);
    },

    addOne: function(feed){
        var feedView = new FeedView({model: feed});
        this.$el.append(feedView.render().el);
    }
});