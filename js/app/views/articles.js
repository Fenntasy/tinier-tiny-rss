var ArticleView = Backbone.View.extend({
    template: _.template($("#article-view-tpl").html()),
    events: {
        'click .title': 'showArticle'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    showArticle: function(e) {
        $(".article-content").hide();
        $(".article-content", $(e.currentTarget).parent()).show();
    }
});