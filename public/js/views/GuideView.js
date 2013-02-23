window.GuideView = Backbone.View.extend({
    initialize: function () {
	// Empty
    },

    render: function () {
	this.$el.html(this.template({
	    guide: this.model.toJSON(),
	    places: this.model.places().toJSON()
	}));
	return this;
    }
});
