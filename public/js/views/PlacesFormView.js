Insidr.Views.PlacesForm = Backbone.View.extend({
	initialize: function () {
		this.placesList = new Insidr.Collections.FSPlaces();
		this.placesList.setNear(this.model.guide.get('city'));
		this.placesView = new Insidr.Views.FSPlaces({model: this.placesList});
		this.listenTo(this.placesView, 'placeSelected', this.addPlace);
		this.listenTo(this.model.places, 'add', this.render);
		this.listenTo(this.model.places, 'remove', this.render);
		this.listenTo(this.model.places, 'change', this.render);
		this.render();
	},

	events: {
		'click li': 'avoidRedirect',
		'submit #placeForm': 'updatePlaces',
		'click #saveButton': 'saveChanges',
		'click #cancelButton': 'cancelChanges',
		'click .removeButton': 'removePlace'
	},

	render: function () {
		this.$el.html(this.template({
			guide: this.model.guide.attributes,
			places: this.model.places.toJSON()
		}));
		this.placesView.setElement(this.$el.find('#fsPlaces'));
	},

	// Persist the model changes to the server.
	// We call the save function on the collection to fire a series of
	// POST/DELETE requests for the guides and places.
	saveChanges: function (e) {
		e.preventDefault();
		this.model.places.save(this.model.guide.get('id'));
		Insidr.Dispatcher.trigger('show_message', 'Places Saved!', 'success');
	},

	// Discard the changes in the model and return to the edit page.
	cancelChanges: function (e) {
		e.preventDefault();
		Backbone.history.navigate('/guides/' + this.model.guide.get('id') + '/edit', { trigger: true });
	},

	// Remove the places from the model's places.
	// Changes do not persist until we explicitly call places.save().
	removePlace: function (e) {
		e.preventDefault();
		var place = this.model.places.get(e.target.id);
		this.model.places.remove(place);
	},

	addPlace: function (fsPlace) {
		var place = new Insidr.Models.Place(fsPlace.attributes);
		/* Save place location. */
		var location = place.get('location');
		var _this = this;
		location.save(null, {
			success: function (savedLocation) {
				/* Once we have a location with an id, save the place. */
				place.unset('location');
				place.set({guideId: _this.model.guide.get('id')});
				place.set({locationId: savedLocation.get('id')});
				place.save(null, {
					success: function (p) {
						place.set({id: p.id});
					}});
				place.set({location: savedLocation});
				_this.model.places.add(place);
			},
			error: function () {

			}});
	},

	avoidRedirect: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},

	updatePlaces: function (e) {
		e.preventDefault();
		var query = $('input[name=place]').val();
		this.placesList.setQuery(query);
		this.placesList.fetch();
	}
});