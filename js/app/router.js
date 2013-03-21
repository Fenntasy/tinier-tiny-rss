window.TTRSS = new (Backbone.Router.extend({
    routes: {
        "": "index",
        "categories": "categories"
    },

    initialize: function () {
//        $(document).on("click", "a:not([data-bypass])", function(evt) {
//            var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
//            var root = location.protocol + "//" + location.host + '/tinier-tiny-rss';
//
//            if (href.prop && href.prop.slice(0, root.length) === root) {
//                evt.preventDefault();
//                TTRSS.navigate(href.attr, {trigger: true});
//            } else {
//                console.log(href);
//                console.log(root);
//                console.log(href.prop.slice(0, root.length));
//                evt.preventDefault();
//            }
//        });
    },

    index: function () {
        this.loginView = new LoginView({model: new Login({op: 'login'})});
        this.loginView.render();
        $('#app').html(this.loginView.el);
    },

    start: function () {
        Backbone.history.start();
        return this;
    },

    categories: function () {
        console.log('toto');
        this.categories = new Category({op: 'getCategories'});
        this.categories.set('sid', getCookie('session_id'));
        var that = this;
        this.categories.fetch({data: JSON.stringify(this.categories.attributes), type: 'POST', contentType: 'application/json'}).then(function() {
            that.categoriesView = new CategoryView({model: that.categories});
            that.categoriesView.render();
            $('#app').html(that.categoriesView.el);
        });
    }
}));