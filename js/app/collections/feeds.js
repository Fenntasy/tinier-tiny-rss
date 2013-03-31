var Feeds = Backbone.Collection.extend({
    model: Feed,
    url: 'http://rss.billey.me/tinier-tiny-rss/api.php',
    parse: function(response) {
        return response.content;
    }
})