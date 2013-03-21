var Login = Backbone.Model.extend({
    urlRoot: 'api.php',
    parse: function(response) {
        return response.content;
    }
});

var login = new Login({op: 'login'});