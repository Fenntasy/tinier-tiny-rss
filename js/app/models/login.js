var Login = Backbone.Model.extend({
    urlRoot: 'http://rss.billey.me/tinier-tiny-rss/api.php',
    parse: function(response) {
        return response.content;
    }
});