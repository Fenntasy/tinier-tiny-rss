var Categories = Backbone.Collection.extend({
  model: Category,
  url: 'http://rss.billey.me/tinier-tiny-rss/api.php'
})