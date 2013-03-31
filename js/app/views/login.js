var LoginView = Backbone.View.extend({
    template: _.template($("#login-view-tpl").html()),
    events: {
        'submit': 'send'
    },
    send: function(e) {
        e.preventDefault();
        var form = $("form", this.$el).get(0);
        var that = this;
        var fetchData = {
            op: 'login',
            password: form.password.value,
            user: form.login.value
        };
        if (form.remember.checked) {
            setCookie('login', form.login.value);
            setCookie('password', form.password.value);
        }
        TTRSS.getJSON(fetchData).then(function(data) {
            setCookie('session_id', data.content.session_id);
            TTRSS.navigate("categories", {trigger: true});
        });
        return false;
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});