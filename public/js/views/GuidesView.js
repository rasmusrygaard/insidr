Insidr.Views.Guides = Backbone.View.extend({
	initialize: function () {
		this.render();
	},

	events: {
		'click #newGuideButton': 'newGuide'
	},

	newGuide: function () {
		Backbone.history.navigate('/guides/new', {trigger: true});
	},

	render: function () {
		this.$el.html(this.template({
			guides: this.model.toJSON() 
		}));
		return this;
	}
});
