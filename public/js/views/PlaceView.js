var PlaceView = Backbone.View.extend({
    initialize: function () {
	this.render();
    },

    render: function () {
	this.$el.html(this.template({
	    place: this.model.attributes
	}));
	return this;
    }
});
