var app = app || {};

(function ($) {
    app.SearchbarView = Backbone.View.extend({
        el: ".searchmenu",
        initialize: function () {
            this.$searchbar = this.$(".searchbar");
            this.dosearch();
        },
        dosearch: function () {
            var _this = this;
            var url = 'https://api.edamam.com/api/food-database/parser?ingr=' + encodeURIComponent(this.$searchbar.val()) + '&app_id=c09f3d08&app_key=a9b6a00391258a70f86975d73a03ad9a&page=0';
            $.ajax({
                url: url,
                method: 'GET',
            }).done(function (result) {
                var dataarray = result.hints;
                if (dataarray.length == 0) {
                    app.searchFoods.reset();
                    alert("could not find this food in the database");
                    _this.$searchbar.val('');

                } else {
                    app.searchFoods.reset();
                    for (var i = 0; i < dataarray.length; i++) {
                        var searchmodel = new app.Item({
                            'title': dataarray[i].food.label,
                            'brand': dataarray[i].food.brand,
                            'calories': dataarray[i].food.nutrients.ENERC_KCAL,
                            'protein': dataarray[i].food.nutrients.PROCNT,
                            'carbs': dataarray[i].food.nutrients.CHOCDF,
                            'fat': dataarray[i].food.nutrients.FAT,
                            'fooduri': dataarray[i].food.uri,
                            'measures': dataarray[i].measures
                        });

                        app.searchFoods.add(searchmodel);
                    }
                    _this.$searchbar.val('');
                }
            }).fail(function (err) {
                console.log("edamam search results could not be loaded");
                throw err;
            });
        }
    });
})(jQuery);