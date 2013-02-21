window.Guide = Backbone.Model.extend({
    urlRoot: '/api/guides',
    
    idAttribute: 'id',

    initialize: function() {
	_.bindAll(this); 
    },

    places: function () {
	if (!this._places) {
	    this._places = new Places();
	    this._places.url = this.urlRoot + '/' + this.get('id') + '/places';
	    this._places.fetch({ async: false });
	}
	return this._places;
    }
});
