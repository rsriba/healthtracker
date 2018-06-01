var app = app || {};
(function () {

    var SearchFoods = Backbone.Collection.extend({

        model: app.Item,
        url: '/healthtracker/searchfoods'
        
    });
    app.searchFoods = new SearchFoods();

})();