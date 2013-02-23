window.Place = Backbone.Model.extend({
    urlRoot: '/api/places',

    initialize: function() {

    },

    /* Return the location of the Place. If the location has not already been 
       loaded, fetch it synchronously from the server. */
    location: function () {
	if (!this._location) {
	    this._location = new Location();
	    this._location.url = this.urlRoot + '/' + this.get('id') + '/locations';
	    this._location.fetch({ async: false });
	}
	return this._location.toJSON();
    }
});
