window.GuideView = Backbone.View.extend({
	initialize: function () {
		this.locationsView = new LocationsView({
			model: _.map(this.model.places.models, function (p) { 
				return p.get('location'); 
			})
		});
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
			places: this.model.places.toJSON()
		}));
		this.$el.find('#location').html(this.locationsView.render().el);
		return this;
	}
});
