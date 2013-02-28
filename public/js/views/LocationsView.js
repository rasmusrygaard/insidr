var LocationsView = Backbone.View.extend({
  initialize: function () {
    this.setMapBoundaries();
    this.latlng = new google.maps.LatLng((this.minLat + this.maxLat) / 2,
      (this.minLng + this.maxLng) / 2);
    this.mapOptions = {
      center: this.latlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.render();
  },

  /* Set the [min|max][Lat|Lng] coordinates based on the model's locations. */
  setMapBoundaries: function () {
    this.minLat = this.maxLat = this.minLng = this.maxLng = null;
    _.each(this.model, function (loc) {
      var lat = loc.get('lat');
      var lng = loc.get('lng');
      if (!this.minLat || lat < this.minLat) {
        this.minLat = lat;
      } else if (!this.maxLat || lat > this.maxLat) {
        this.maxLat = lat;
      }
      if (!this.minLng || lng < this.minLng) {
        this.minLng = lng;
      } else if (!this.maxLng || lng > this.maxLng) {
        this.maxLng = lng;
      }
    }, this);
  },

  render: function () {
    this.$el.html(this.template({
      location: this.model.attributes
    }));
    var map = new google.maps.Map(this.$el.find('#map_canvas')[0],
      this.mapOptions);
    _.each(this.model, function (loc) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(loc.get('lat'), loc.get('lng')),
        map: map,
        title: 'Testing!'
      });
    });
    var _this = this;
    google.maps.event.addListener(map, 'idle', function () {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(_this.latlng);
    });
    return this;
  }
});
