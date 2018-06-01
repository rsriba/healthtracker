var app = app || {};

(function () {
    app.FoodRouter = Backbone.Router.extend({
        routes: {
            '*tabs': 'setTab'
        },

        setTab: function (param) {
            if (param) {
                param = param.trim();
            }
            app.Tab = param || '';
            app.searchFoods.trigger('visible');
        }
    });

})();