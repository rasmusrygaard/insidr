var PlaceView = Backbone.View.extend({
    initialize: function () {
	console.log('model.location:' + this.model.get('location'));
	this.locationView = new LocationView({model: this.model.get('location')});
	this.render();
    },

    render: function () {
	this.$el.html(this.template({
	    place: this.model.attributes
	}));
	this.$el.find('#location').html(this.locationView.render().el);
	return this;
    }
});
