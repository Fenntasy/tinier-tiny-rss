var CategoryView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#category-view-tpl").html()),
    events: {
        'click .expand-category': 'expand'
    },
    render: function(feeds) {
        this.$el.html(this.template(this.model.toJSON()));
        var feedsView = new FeedsView({collection: feeds});
        console.log(this.model.get('id'));
        this.$el.append(feedsView.render(this.model.get('id')).el);
        return this;
    },
    expand: function(e) {
        e.preventDefault();
        var id = $(e.target).parent().data('cat_id');

        $("#cat-" + id).parent().toggleClass("visible");

        return false;
    }
});