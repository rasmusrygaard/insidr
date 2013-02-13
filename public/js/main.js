var GuideView = Backbone.View.extend({
    initialize: function () {
	this.render();
    },
    
    navigate: function () {
	app.navigate('/foo/14', {trigger: true});
    },

    events: {
	'click' : 'navigate'
    },

    template: _.template("<p><%= name %></p><p><%= city %></p>"),

    render: function () {
	this.$el.html(this.template(this.model.toJSON()));
	return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
	'': 'simpleGuide',
	'foo/:id': 'guideDetails'
    },

    initialize: function () {
	
    },
    
    simpleGuide: function (id) {
	var guide = new Guide({ _id: 11 });
	guide.fetch({ success: function () {
	    var guideView = new GuideView({model: guide});
	    $('#container').html(guideView.render().el);
	}});
    },

    guideDetails: function (id) {
	var guide = new Guide({ id: id });
	guide.fetch().success(function () {
	    var guideView = new GuideView({model: guide});
	    $('#container').html(guideView.render().el);
	});
    }
});

var AppView = Backbone.View.extend({
    el: '#container',
    
    initialize: function() {
	this.render();
    },

    render: function() {
	this.$el.html("Hello World<a href=\"/foo\">foo</a>");
    }
});

var av = new AppView();
var app = new AppRouter();

Backbone.history.start({pushState: true });
