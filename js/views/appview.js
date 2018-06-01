var app = app || {};

(function ($) {
    app.AppView = Backbone.View.extend({
        el: '.caloriecounterapp',

        events: {
            'change #datepicker': 'pickDate',
            'click .search': 'search',
            'keypress .searchbar': 'searchonEnter',
            'click .icon': 'openmenu',
            'click .closeicon,.tabli': 'closemenu',
        },

        initialize: function () {
            
            $datepicker = $('#datepicker');
            $datepicker.datepicker('setDate', new Date);
            app.date = $datepicker.val();

            new app.SearchlistView();
            new app.AddedlistView();
           
            this.$searchresults = this.$(".searchcontainer"); 
            this.$addedresults = this.$(".addedcontainer");
            this.$contentheader = this.$(".contentheader");
            this.$searchbar = this.$(".searchbar");
            this.$tabmenu = this.$(".tabmenu");

            this.listenTo(app.addedFoods, 'switch', this.enablemyfoodtab);
            this.listenTo(app.searchFoods, 'switch', this.enablesearchtab);
            this.listenTo(app.searchFoods, 'visible', this.toggleVisible);

            this.$totalcals = $(".totalcals");
            this.listenTo(app.addedFoods, 'update', this.calcCals);

           
            this.foodRouter = new app.FoodRouter();
            Backbone.history.start();
        },

        search: function () {
            app.searchFoods.trigger('switch');
            if (this.$searchbar.val()) {
                this.$contentheader.text("Search results for: " + this.$searchbar.val());
                new app.SearchbarView();
            } else {
                alert("enter a string to search");
            }
        },
        searchonEnter: function (event) {
            if (event.which !== ENTER_KEY) {
                return;
            } else {
                this.search();
            }
        },

        toggleVisible: function () {
            this.$addedresults.toggleClass('hidden', (this.verify()));
            this.$searchresults.toggleClass('hidden', (!this.verify()));
            this.$('.displaymenu li a').removeClass('selected').filter('[href="#/' + (app.Tab || '') + '"]').addClass('selected');
        },
        verify: function () {
            if (app.Tab == "myfood") {
                this.$contentheader.text("My Foods:");
                return false;
            } else {
                this.$contentheader.text("Often searched:");
                return true;
            };
        },

        calcCals: function () {
            app.Cals = 0;
            //filtering selected date to calc total calories:
            app.addedFoods.forEach(function (model) {
                if (app.date == model.get("date")) {
                    app.Cals += parseInt(model.get("calories"));
                }
            });
            this.$totalcals.text(app.Cals);
        },

        pickDate: function () {
            if ($datepicker.val()) {
                app.date = $datepicker.val();
            }
            this.calcCals();
            app.addedFoods.trigger('datedisplay');
            this.closemenu();
        },

        enablemyfoodtab: function () {
            this.foodRouter.navigate("myfood", true);
        },
        enablesearchtab: function () {
            this.foodRouter.navigate("", true);
        },

        openmenu: function () {
            this.$tabmenu.addClass("open");
        },
        closemenu: function () {
            this.$tabmenu.removeClass("open");
        }

    });
})(jQuery);