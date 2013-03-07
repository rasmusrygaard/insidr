Insidr.Views.PlaceForm = Backbone.View.extend({
	initialize: function () {
		this.placesList = new Insidr.Collections.FSPlaces();
		this.placesList.setNear('San Francisco,CA');
		this.placesView = new Insidr.Views.FSPlaces({model: this.placesList});
		this.render();
	},

	events: {
		'submit': 'updatePlaces'
	},

	render: function () {
		this.$el.html(this.template);
		this.placesView.setElement(this.$el.find('#fsPlaces'));
	},

	updatePlaces: function (e) {
		e.preventDefault();
		var query = $('input[name=place]').val();
		this.placesList.setQuery(query);
		this.placesList.fetch({error: function () { console.log('Done fetching'); }});
	}
});