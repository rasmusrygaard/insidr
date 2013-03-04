Insidr.Views.Place = Backbone.View.extend({
	initialize: function () {
		this.locationView = new Insidr.Views.Location({model: this.model.get('location')});
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			place: this.model.attributes
		}));
		this.$el.find('#location').html(this.locationView.render().el);
		return this;
	}
});
