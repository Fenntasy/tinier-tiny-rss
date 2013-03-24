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
        var current_article = $(".article-content", $(e.currentTarget).parent());
        if (!current_article.hasClass("visible")) {
            $(".visible").removeClass("visible");
        }
        current_article.toggleClass('visible');
    }
});