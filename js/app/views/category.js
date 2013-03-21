var CategoryView = Backbone.View.extend({
    template: _.template($("#categories-view-tpl").html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});