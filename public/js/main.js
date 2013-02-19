var AppRouter = Backbone.Router.extend({
    routes: {
	'': 'home',
	'foo/:id': 'guideDetails'
    },

    initialize: function () {
	this.headerView = new HeaderView();
	$('.header').html(this.headerView.el);
    },

    home: function () {
	if (!this.homeView) {
	    this.homeView = new HomeView();
	}
	$('#content').html(this.homeView.el);
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
    }
});

var AppView = Backbone.View.extend({
    el: '#content',
    
    initialize: function() {

    },

    render: function() {
	
	this.$el.html("Hello World<a href=\"/foo/14\">foo</a>");
    }
});

var av = new AppView();

utils.loadTemplate(['GuideView', 'HeaderView', 'HomeView'], function () {
    var app = new AppRouter();
    Backbone.history.start({pushState: true });
});
