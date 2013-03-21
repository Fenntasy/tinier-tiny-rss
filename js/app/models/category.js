var Category = Backbone.Model.extend({
    urlRoot: 'api.php'
});
var categories = new Category({op: 'getCategories'});