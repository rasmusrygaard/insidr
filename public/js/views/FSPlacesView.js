Insidr.Views.FSPlaces = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, 'reset', this.render);
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			places: this.model.toJSON()
		}));
	}
});