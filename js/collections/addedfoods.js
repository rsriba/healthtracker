var app = app || {};
(function () {
    var AddedFoods = Backbone.Collection.extend({

        model: app.Item,
        url: '/healthtracker/addedfoods'

    });
    app.addedFoods = new AddedFoods();
})();