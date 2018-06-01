var app = app || {};
(function ($) {
    app.SearchitemView = Backbone.View.extend({
        tagName: 'div',
        className: 'searchitem',

        template: _.template($('#searchtemplate').html()),

        events: {
            'click .add': 'addtofoods'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        addtofoods: function () {
            var foodmodel = new app.Item({
                username: 'praha',
                date: app.date,
                title: this.model.get('title'),
                brand: this.model.get('brand'),
                calories: this.model.get('calories'),
                servings: this.model.get('servings'),
                carbs: this.model.get('carbs'),
                protein: this.model.get('protein'),
                fat: this.model.get('fat')

            });
            app.addedFoods.create(foodmodel);
            app.addedFoods.trigger('switch');

        }
       
    });
})(jQuery);