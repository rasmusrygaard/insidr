var Insidr = new (Backbone.View.extend({
	Models: {},
	Views: {},
	Collections: {},
	Router: {},
	events: {
		'click a': function (e) {
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	},
	start: function () {
		utils.loadTemplate(['Guide', 'Header', 'Home', 'Guides',
			'Place', 'Location', 'Locations', 'Category', 'Categories'], function () {
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
		'guides/:id': 'showGuide',
		'places/:id': 'showPlace',
		'categories/:id': 'showCategory',
		'categories': 'showCategories'
	},

	initialize: function () {
		this.headerView = new Insidr.Views.Header();
		$('.header').html(this.headerView.render().el);
	},

	home: function () {
		if (!this.homeView) {
			var categories = new Insidr.Collections.Categories();
			categories.fetch({ success: function (cats) {
				this.homeView = new Insidr.Views.Home({model: cats});
				$('#content').html(this.homeView.el);
			}});
		}
	},

	// GET '/categories'
	showCategories: function () {
		var categories = new Insidr.Collections.Categories();
		categories.fetch({ success: function (cats) {
			var categoriesView = new Insidr.Views.Categories({model: cats});
			$('#content').html(categoriesView.el);
		}});
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
		console.log(guide);
		guide.fetch({success: function () {
			var guideView = new Insidr.Views.Guide({ model: guide });
			$('#content').html(guideView.render().el);
		}});
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

$(function () { Insidr.start(); });

