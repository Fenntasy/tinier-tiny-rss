var FeedView = Backbone.View.extend({
    template: _.template($("#feed-view-tpl").html()),
    tagName: 'li',
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});