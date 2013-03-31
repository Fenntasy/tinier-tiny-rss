var Feeds = Backbone.Collection.extend({
    model: Feed,
    url: 'http://rss.billey.me/tinier-tiny-rss/api.php',
    parse: function(response) {
        if (response.content.error && response.error == 'NOT_LOGGED_IN') {
            setCookie('session_id', '0');
            TTRSS.navigate("", {trigger: true});
            return false;
        }
        return response.content;
    }
})