var AppRouter = Backbone.Router.extend({
    routes: {
	'': 'home',
	'foo/:id': 'guideDetails',
	'guides': 'showGuides',
	'guides/:id': 'showGuide',
	'places/:id': 'showPlace'
    },

    initialize: function () {
	this.headerView = new HeaderView();
	$('.header').html(this.headerView.render().el);
    },

    home: function () {
	if (!this.homeView) {
	    this.homeView = new HomeView();
	}
	$('#content').html(this.homeView.el);
    },

    showGuides: function () {
	var guides = new Guides();
	guides.fetch({ success: function () {
	    var guidesView = new GuidesView({ model: guides });
	    $('#content').html(guidesView.render().el);
	}});
    },

    showGuide: function (id) {
	var guide = new Guide({id: id});
	guide.set({ 'getLocations': true });
	guide.fetch({success: function () {
	    var guideView = new GuideView({ model: guide });
	    $('#content').html(guideView.render().el);
	}});
    },
    
    simpleGuide: function (id) {
	var guide = new Guide({ _id: 11, name: 'Test Guide' });
	guide.fetch({ success: function () {
	    var guideView = new GuideView({model: guide});
	    $('#content').html(guideView.render().el);
	}});
    },

    guideDetails: function (id) {
	var guide = new Guide({ id: id });
	guide.fetch().success(function () {
	    var guideView = new GuideView({model: guide});
	    $('#content').html(guideView.render().el);
	});
    },

    showPlace: function (id) {
	var place = new Place({ id: id });
	place.fetch().success(function () {
	    var placeView = new PlaceView({model: place});
	    $('#content').html(placeView.render().el);
	});
    }
});

/* Override clicks to use Backbone Router. */
$(document).on("click", "a[href^='/']", function(event) {
  if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
    event.preventDefault();
    var url = $(event.currentTarget).attr("href").replace(/^\//, "");
    app.navigate(url, { trigger: true });
  }
});

var app;
utils.loadTemplate(['GuideView', 'HeaderView', 'HomeView', 'GuidesView', 'PlaceView', 'LocationView'], function () {
    app = new AppRouter();
    Backbone.history.start({pushState: true });
});
