var Categories = Backbone.Collection.extend({
    model: Category,
    url: 'http://rss.billey.me/tinier-tiny-rss/api.php',
    parse: function(response) {
        if (response.content.error && response.error == 'NOT_LOGGED_IN') {
            setCookie('session_id', '0');
            TTRSS.navigate("", {trigger: true});
            return false;
        }

        var list = _.filter(response.content, function(el) {
            return el.id > 0;
        })
        return list;
    }
})