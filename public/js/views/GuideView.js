window.GuideView = Backbone.View.extend({
	initialize: function () {
		/* Empty */
	},

	render: function () {
		Handlebars.registerHelper('address', function(place) {
			return place.location.get('address');
		});
		Handlebars.registerHelper('postalCode', function(place) {
			return place.location.get('postalCode');
		});
		this.$el.html(this.template({
			guide: this.model.toJSON(),
			places: this.model.places().toJSON()
		}));
		return this;
	}
});
