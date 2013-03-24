window.TTRSS = new (Backbone.Router.extend({
    routes: {
        "": "index",
        "categories": "categories",
        "feed/:id": "feed",
        "feed/view/:id": "articles"
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
            if (that.categories.get('content').error && that.categories.get('content').error == 'NOT_LOGGED_IN') {
                setCookie('session_id', '0');
                TTRSS.navigate("", {trigger: true});
                return;
            }
            that.categoriesView = new CategoryView({model: that.categories});
            that.categoriesView.render();
            $('#app').html(that.categoriesView.el);
        });
    },

    feed: function(id) {
        if ($("li", "#cat-" + id).size()) {
            $("#cat-" + id).toggleClass("visible");
        } else {
            var feed = new Feed({op: 'getFeeds'});
            feed.set({
                sid: getCookie('session_id'),
                cat_id: id,
                unread_only: false,
                limit: 20,
                offset: 0,
                include_nested: true
            });
            feed.fetch({data: JSON.stringify(feed.attributes), type: 'POST', contentType: 'application/json'}).then(function() {
                var feedView = new FeedView({model: feed});
                feedView.render();
                $("#cat-" + id).toggleClass("visible").html(feedView.el);
            });
        }
    },

    articles: function(id) {
        var articles = new Article({op: 'getHeadlines'});
        articles.set({
            sid: getCookie('session_id'),
            feed_id: id,
            limit: 20,
            skip: 0,
            include_nested: true,
            show_excerpt: true,
            show_content: true,
            view_mode: 'unread',
            include_attachments: false
        });
        articles.fetch({data: JSON.stringify(articles.attributes), type: 'POST', contentType: 'application/json'}).then(function() {
            var articlesView = new ArticleView({model: articles});
            articlesView.render();
            $("#feeds").html(articlesView.el);
        });
    }
}));