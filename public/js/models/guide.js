Insidr.Models.Guide = Backbone.Model.extend({
	urlRoot: '/api/guides',

	idAttribute: 'id',

	initialize: function() {
		if (this.collection === undefined) {
			this.places = this.getPlaces();
		}
	},

	defaults: {
		getLocations: false
	},

	getPlaces: function () {
		if (!this._places) {
			this._places = new Insidr.Collections.Places();
			console.log(this._places);
			this._places.url = this.urlRoot + '/' + this.get('id') + '/places?';
			if (this.get('getLocations')) this._places.url += 'locations=true';
			this._places.fetch({ async: false });
		}
		return this._places;
	}
});
