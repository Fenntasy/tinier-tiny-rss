var Categories = Backbone.Collection.extend({
    model: Category,
    url: 'http://rss.billey.me/tinier-tiny-rss/api.php',
    parse: function(response) {
        var list = _.filter(response.content, function(el) {
            return el.id > 0;
        })
        return list;
    }
})