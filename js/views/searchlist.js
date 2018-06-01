var app = app || {};
(function ($) {
    app.SearchlistView = Backbone.View.extend({
        el: '.searchcontainer',
 
        initialize: function () {
            this.listenTo(app.searchFoods, 'add', this.renderitem);
            this.listenTo(app.searchFoods, 'reset', this.renderSearch);

            app.searchFoods.fetch({ reset: true });

        },

        renderSearch: function () {
            this.destroy();
            app.searchFoods.each(function (itemdata) {
                this.renderitem(itemdata);
            }, this);

        },
        renderitem: function (itemdata) {
            var searchitemView = new app.SearchitemView({ model: itemdata });
            this.$el.append(searchitemView.render().el);
        },

        destroy: function () {
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.$el.empty();
        }

    });
})(jQuery);