window.GuideView = Backbone.View.extend({
    initialize: function () {
	this.render();
    },
    
    navigate: function () {
	app.navigate('/foo/14', {trigger: true});
    },

    events: {
	'click' : 'navigate'
    },

    render: function () {
	this.$el.html(this.template(this.model.toJSON()));
	return this;
    }
});
