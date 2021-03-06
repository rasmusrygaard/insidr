var Insidr = new (Backbone.View.extend({
    Models: {},
    Views: {},
    Collections: {},
    Router: {},
    events: {
        'click a': function (e) {
            if (!$(e.target).hasClass('external')) {
                e.preventDefault();
                Insidr.Dispatcher.trigger('hide_message');
                Backbone.history.navigate(e.target.pathname, {trigger: true});
            }
        }
    },
    start: function () {
        utils.loadTemplate(['Guide', 'Header', 'Home', 'Guides', 'GuideForm', 'Flash', 'User',
            'Place', 'Location', 'Locations', 'Category', 'Categories', 'FSPlaces', 'PlaceForm', 'PlacesForm'], function () {
                var router = new Insidr.Router();
                Backbone.history.start({pushState: true});
                
            }
            );
    }
}))({el: document.body});

Insidr.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'foo/:id': 'guideDetails',
        'guides': 'showGuides',
        'guides/new': 'newGuide',
        'guides/:id': 'showGuide',
        'guides/:id/edit': 'editGuide',
        'guides/:id/places/edit': 'editGuidePlaces',
        'places/add': 'addPlace',
        'places/search/:query': 'searchPlaces',
        'places/:id': 'showPlace',
        'categories/:id': 'showCategory',
        'categories': 'showCategories'
        
    },

    initialize: function () {
        this.headerView = new Insidr.Views.Header();
        $('.header').html(this.headerView.render().el);
        this.flashView = new Insidr.Views.Flash({el: $('#flash')});
    },

    getCategories: function () {
        if (!this._categories) {
            this._categories = new Insidr.Collections.Categories();
            this._categories.fetch();
        }
        return this._categories;
    },

    home: function () {
        if (!this.homeView) {
            var bootstrapGuides = [
                { name: "Willa's Books", city: "Santa Cruz, CA", id: 6 },
                { name: "Date Places", city: "San Francisco, CA", id: 5 },
                { name: "San Francisco Coffee Crawl", city: "San Francisco, CA", id: 7 },
                { name: "Hacker Gourmet", city: "Stanford, CA", id: 9 },
                { name: "Danish Coffee", city: "Copenhagen, Denmark", id: 10},
                { name: "Seattle Gourmet", city: "Seattle, WA", id: 11}
            ];
            this.homeView = new Insidr.Views.Home({model: {
                categories: this.getCategories(), 
                guides: bootstrapGuides
            }});
        }
        $('#content').html(this.homeView.render().el);
    },

    // GET '/categories'
    showCategories: function () {
        var categoriesView = new Insidr.Views.Categories({model: this.getCategories() });
        $('#content').html(categoriesView.el);
    },

    // GET '/guides
    showGuides: function () {
        var guides = new Insidr.Collections.Guides();
        guides.fetch({ success: function () {
            var guidesView = new Insidr.Views.Guides({ model: guides });
            $('#content').html(guidesView.el);
        }});
    },

    // GET '/category/:id'
    showCategory: function (id) {
        var category = new Insidr.Models.Category({ id: id });
        category.fetch({ success: function (cat) {
            var categoryView = new Insidr.Views.Category({ model: cat});
            $('#content').html(categoryView.render().el);
        }});
    },

    showGuide: function (id) {
        var guide = new Insidr.Models.Guide({id: id, getLocations: true});
        guide.fetch({success: function () {
            var guideView = new Insidr.Views.Guide({ model: guide });
            $('#content').html(guideView.render().el);
        }});
    },

    addPlace: function (query) {
        var placesView = new Insidr.Views.PlaceForm();
        $('#content').html(placesView.el);
    },

    searchPlaces: function (query) {
        var places = new Insidr.Collections.FSPlaces();
        places.setNear('Stanford,CA');
        places.setQuery(query);
        places.fetch({success: function () {
            ppp = places;
            var placesView = new Insidr.Views.FSPlaces({model: places});
            $('#content').html(placesView.el);
            setTimeout(function () { alert('removing'); places.remove(places.at(0)); }, 1000);
        }});
    },

    editGuide: function (id) {
        var guide = new Insidr.Models.Guide({id: id});
        var _this = this;
        guide.fetch({success: function () {
            var guideFormView = new Insidr.Views.GuideForm({
                model: { guide: guide,
                    categories: _this.getCategories()
                }
            });
            $('#content').html(guideFormView.el);
        }});
    },

    editGuidePlaces: function (id) {
        var guide = new Insidr.Models.Guide({id: id, getLocations: true});
        var _this = this;
        guide.fetch({success: function () {
            var guidePlacesView = new Insidr.Views.PlacesForm({
                model: {guide: guide, places: guide.getPlaces()}
            });
            $('#content').html(guidePlacesView.el);
        }});
    },

    newGuide: function () {
        var guide = new Insidr.Models.Guide();
        var guideFormView = new Insidr.Views.GuideForm({
            model: { 
                guide: guide,
                categories: this.getCategories()
            }
        });
        $('#content').html(guideFormView.el);
    },

    guideDetails: function (id) {
        var guide = new Insidr.Models.Guide({ id: id });
        guide.fetch().success(function () {
            var guideView = new Insidr.Views.Guide({model: guide});
            $('#content').html(guideView.render().el);
        });
    },

    showPlace: function (id) {
        var place = new Insidr.Models.Place({ id: id });
        place.fetch().success(function () {
            var placeView = new Insidr.Views.Place({model: place});
            $('#content').html(placeView.render().el);
        });
    }
});

Insidr.Dispatcher = _.extend({}, Backbone.Events);

Insidr.Views.Flash = Backbone.View.extend({
    initialize: function () {
        Insidr.Dispatcher.bind('show_message', this.render, this);
        Insidr.Dispatcher.bind('hide_message', this.hideMessage, this);
        this.hideMessage();
    },

    events: {
        'click .close': 'hideMessage'
    },

    hideMessage: function () {
        this.$el.hide();
    },

    render: function (msg, type) {
        if (type === 'success') {
            this.$el.addClass('alert-success');
            this.$el.removeClass('alert-error');
        } else {
            this.$el.addClass('alert-error');
            this.$el.removeClass('alert-success');
        }
        this.$el.show();
        this.$el.html(this.template({message: msg}));
        var _this = this;
        setTimeout(function () { _this.hideMessage(); }, 3000);
        return this;
    }
});

var signinCallback = function (authResult) {
    if (authResult.access_token) {
        $('#signinButton').hide();
        /* Load Google+ API */
        gapi.client.load('plus','v1', function() {
            /* Fetch user. */
            gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(user) { 
                var u = new Insidr.Models.User({name: user.displayName, image: user.image.url});
                var userView = new Insidr.Views.User({model: u, el: $('#signIn')});
                $('#signIn').show();
                Insidr.Dispatcher.trigger('show_message', 'Welcome back ' + u.get('name') + '!', 'success');
            });
        });
        
    } else if (authResult.error) {
        // There was an error.
        // Possible error codes:
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatially log in the user
        // console.log('There was an error: ' + authResult['error']);
    }
    
    
};

$(document).ready(function () { Insidr.start(); });

