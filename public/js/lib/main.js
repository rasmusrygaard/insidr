window.GuideView = Backbone.View.extend({
    initialize: function () {
	this.render();
    },

    render: function () {
	$(this.el).html(this.template());
    }
});

var app = new AppRouter();
Backbone.history.start();
