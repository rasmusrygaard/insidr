window.Place = Backbone.Model.extend({
  urlRoot: '/api/places',

  initialize: function() {
    this.set({ 'location': this.getLocation()});
  },

  /* Return the location of the Place. If the location has not already been 
  loaded, fetch it synchronously from the server. */
  getLocation: function () {
    if (this.has('location')) {
      return new Location(this.get('location'));
    } else {
      var loc = new Location();
      loc.url = this.urlRoot + '/' + this.get('id') + '/locations';
      loc.fetch({ async: false });
      return loc;
    }
  }
});
