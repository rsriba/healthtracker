var app = app || {};
(function ($) {
    app.AddeditemView = Backbone.View.extend({
        tagName: 'div',
        className: 'addeditem',

        template: _.template($('#addedtemplate').html()),

        events: {
            'click .delete': 'deleteitem'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(app.addedFoods, 'datedisplay', this.close);
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        deleteitem: function () {
            this.model.destroy();
            this.remove();
        },
        close: function () {
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.remove();
        }

    });
})(jQuery);