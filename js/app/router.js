window.TTRSS = new (Backbone.Router.extend({
    routes: {
        "": "index",
        "categories": "categories",
        "feed/cat/view/:id": "feed",
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
        this.loginView = new LoginView({model: new Login()});
        this.loginView.render();
        $('#app').html(this.loginView.el);
    },

    getJSON: function(data) {
        return $.ajax({
            url: 'http://rss.billey.me/tinier-tiny-rss/api.php',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: "application/json",
            emulateHTTP: false,
            emulateJSON: false,
            parse: true,
            dataType: 'json'
        });
    },

    start: function () {
        if (getCookie('session_id')) {
            TTRSS.getJSON({
                op: 'isLoggedIn',
                sid: getCookie('session_id')
            }).then(function(data) {
                if (!data.content.status) {
                    setCookie('session_id', '0');
                    if (getCookie('login') && getCookie('password')) {
                        TTRSS.getJSON({
                            op: 'login',
                            user: getCookie('login'),
                            password: getCookie('password')
                        }).then(function(data) {
                            setCookie('session_id', data.content.session_id);
                            TTRSS.navigate("categories", {trigger: true});
                        });
                    } else {
                        TTRSS.navigate("", {trigger: true});
                    }
                } else {
                    TTRSS.navigate("categories", {trigger: true});
                }
            });
        } else {
            if (getCookie('login') && getCookie('password')) {
                TTRSS.getJSON({
                    op: 'login',
                    user: getCookie('login'),
                    password: getCookie('password')
                }).then(function(data) {
                    setCookie('session_id', data.content.session_id);
                    TTRSS.navigate("categories", {trigger: true});
                });
            } else {
                TTRSS.navigate("", {trigger: true});
            }
        }
        Backbone.history.start();
        return this;
    },

    categories: function () {
        this.categories = new Categories();
        var that = this;
        var fetchData = {
            op: 'getCategories',
            sid: getCookie('session_id')
        };
        this.categories.fetch({data: JSON.stringify(fetchData), type: 'POST', contentType: 'application/json'}).success(function() {
            that.categoriesView = new CategoriesView({collection: that.categories});
            that.categoriesView.render();
            var template = _.template($("#categories-view-tpl").html());
            $('#app').html(template());
            $("ul", "#categories").html(that.categoriesView.el);
        });
    },

    feed: function(id) {
        var articles = new Article({op: 'getHeadlines'});
        articles.set({
            sid: getCookie('session_id'),
            feed_id: id,
            limit: 20,
            is_cat: true,
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