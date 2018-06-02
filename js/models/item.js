var app = app || {};
(function () {
    app.Item = Backbone.Model.extend({
        defaults: {
            date: '',
            title: 'food',
            brand: 'generic',
            calories: '0',
            servings: '1',
            carbs: '0',
            protein: '0',
            fat: '0'

        },
        parse: function (response) {
            response.id = response._id;
            return response;
        }
    });
})();