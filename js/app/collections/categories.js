window.Categories = Backbone.Collection.extend({
  model: Category,
  url: 'http://rss.billey.me/api',
})