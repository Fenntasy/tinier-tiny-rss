var CategoryView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#category-view-tpl").html()),
    events: {
        'click .expand-category': 'expand'
    },
    render: function(feeds) {
        this.$el.html(this.template(this.model.toJSON()));
        var feedsView = new FeedsView({collection: feeds});
        this.$el.append(feedsView.render(this.model.get('id')).el);

        if (getCookie('cat-' + this.model.get('id')) && getCookie('cat-' + this.model.get('id')) == "visible") {
            this.$el.addClass("visible");
        }
        return this;
    },
    expand: function(e) {
        e.preventDefault();
        var id = $(e.target).parent().data('cat_id');
        var list = $("#cat-" + id).parent();
        if (list.hasClass("visible")) {
            list.removeClass("visible");
            setCookie('cat-' + id, 'invisible');
        } else {
            list.addClass("visible");
            setCookie('cat-' + id, 'visible');
        }

        return false;
    }
});