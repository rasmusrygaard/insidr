window.Guide = Backbone.Model.extend({
    urlRoot: '/api/guides',
    
    idAttribute: 'id',

    initialize: function() {
	_.bindAll(this); 
    },

    defaults: {
	getLocations: false
    },
    
    places: function () {
	if (!this._places) {
	    this._places = new Places();
	    this._places.url = this.urlRoot + '/' + this.get('id') + '/places?';
	    if (this.get('getLocations')) this._places.url += 'locations=true';
	    this._places.fetch({ async: false });
	    console.log(this._places);
	}
	return this._places;
    }
});
