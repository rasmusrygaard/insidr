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
			this._places.url = this.urlRoot + '/' + this.get('id') + '/places?';
			if (this.get('getLocations')) this._places.url += 'locations=true';
			this._places.fetch({ async: false });
			var _this = this;
			_.each(this._places.models, function (p) {
				p.set({guideId: _this.get('id')});
			});
		}
		return this._places;
	}
});
