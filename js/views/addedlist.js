var app = app || {};

(function ($) {

    app.AddedlistView = Backbone.View.extend({
        el: '.addedcontainer',

        initialize: function () {
            this.listenTo(app.addedFoods, 'add reset', this.render);
            this.listenTo(app.addedFoods, 'datedisplay', this.render);

            app.addedFoods.fetch({ reset: true });

            this.render();
        },

        render: function () {
            this.destroy();
            this.count = 0;
            app.addedFoods.forEach(_.bind(function (modeldata) {
                if (app.date == $.format.date(new Date(modeldata.attributes.date), 'MM/dd/yyyy')) {
                    this.count += 1;
                    var addedView = new app.AddeditemView({ model: modeldata });
                    this.$el.append(addedView.render().el);
                }
            }, this));

            if (this.count == 0) {
                this.$el.text("Foods haven't been added for the selected date yet!");
            }

        },
        destroy: function () {
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.$el.empty();
        }
    });

})(jQuery);