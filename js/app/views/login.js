var LoginView = Backbone.View.extend({
    template: _.template($("#login-view-tpl").html()),
    events: {
        'submit': 'send'
    },
    send: function(e) {
        e.preventDefault();
        var form = $("form", this.$el).get(0);
        this.model.set('user', form.login.value);
        this.model.set('password', form.password.value);
        var that = this;
        this.model.fetch({data: JSON.stringify(this.model.attributes), type: 'POST', contentType: 'application/json'}).then(function() {
            console.log(that.model.get('session_id'));
            TTRSS.navigate("categories", {trigger: true});
        });
        return false;
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});