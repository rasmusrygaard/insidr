var LocationView = Backbone.View.extend({
	initialize: function () {
		this.latlng = new google.maps.LatLng(this.model.get('lat'),
											 this.model.get('lng'));
		this.mapOptions = {
			center: this.latlng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			location: this.model.attributes
		}));
		var map = new google.maps.Map(this.$el.find('#map_canvas')[0],
			this.mapOptions);

		var marker = new google.maps.Marker({
			position: this.latlng,
			map: map,
			title: 'Testing!'
		});
		var _this = this;
		google.maps.event.addListener(map, 'idle', function() {
			google.maps.event.trigger(map, 'resize');
			map.setCenter(_this.latlng);
		});
		return this;
	}
});
