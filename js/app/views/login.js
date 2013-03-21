var LoginView = Backbone.View.extend({
    template: _.template('<div class="row span3">' +
                            '<form class="form-signin">' +
                                '<h2 class="form-signin-heading">Please sign in</h2>' +
                                '<input type="text" name="login" class="input-block-level" placeholder="Email address">' +
                                '<input type="password" name="password" class="input-block-level" placeholder="Password">' +
                                '<button class="btn btn-large btn-primary" type="submit">Sign in</button>' +
                            '</form>' +
                        '</div>'),
    events: {
        'submit': 'send'
    },
    send: function(e) {
        e.preventDefault();
        var form = $("form", this.$el).get(0);
        login.set('user', form.login.value);
        login.set('password', form.password.value);
        login.save().then(function() {
            console.log(login.get('session_id'));
        });
        return false;
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
$(document).ready(function() {
    var loginView = new LoginView({model: login});
    loginView.render();
    $('#app').html(loginView.el);
});