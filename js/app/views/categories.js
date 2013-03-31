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
        var feeds = new Feeds();
        var fetchData = {
            op: 'getFeeds',
            sid: getCookie('session_id'),
            cat_id: category.get('id'),
            unread_only: false,
            limit: 20,
            offset: 0,
            include_nested: true
        };
        feeds.fetch({data: JSON.stringify(fetchData), type: 'POST', contentType: 'application/json'});
        category.set('feeds', feeds);
        var categoryView = new CategoryView({model: category});
        this.$el.append(categoryView.render(feeds).el);
    }
});