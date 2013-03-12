Insidr.Models.Place = Backbone.Model.extend({
  urlRoot: '/api/places',

  initialize: function() {
    this.set({ 'location': this.getLocation()});
  },

  /* Return the location of the Place. If the location has not already been 
  loaded, fetch it synchronously from the server. */
  getLocation: function () {
    if (this.has('location')) {
      if (this.get('location').parse !== undefined) {
        /* If we have a Backbone model, just return it. */
        return this.get('location');
      } else {
        /* Otherwise, build a new model from the attributes. */
        return new Insidr.Models.Location(this.get('location'));
      }
    } else {
      var loc = new Insidr.Models.Location();
      loc.url = this.urlRoot + '/' + this.get('id') + '/locations';
      loc.fetch({ async: false });
      return loc;
    }
  }
});
