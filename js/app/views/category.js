var CategoryView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#category-view-tpl").html()),
    events: {
        'click .expand-category': 'expand'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    expand: function(e) {
        e.preventDefault();
        var id = $(e.target).parent().data('cat_id');

        if ($("li", "#cat-" + id).size()) {
            $("#cat-" + id).parent().toggleClass("visible");
        } else {
            var feed = new Feed({op: 'getFeeds'});
            feed.set({
                sid: getCookie('session_id'),
                cat_id: id,
                unread_only: false,
                limit: 20,
                offset: 0,
                include_nested: true
            });
            feed.fetch({data: JSON.stringify(feed.attributes), type: 'POST', contentType: 'application/json'}).then(function() {
                var feedView = new FeedView({model: feed});
                feedView.render();
                $("#cat-" + id).html(feedView.el).parent().toggleClass("visible");
            });
        }

        return false;
    }
});