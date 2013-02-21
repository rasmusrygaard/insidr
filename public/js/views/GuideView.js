window.GuideView = Backbone.View.extend({
    initialize: function () {
	// Empty
    },

    render: function () {
	console.log(this.model.places().models);
	_.each(this.model.places().models, function (e) {
	    e.location();
	    e.loc = e._location.toJSON();
	    console.log(e.loc.address);
	});
	this.$el.html(this.template({
	    guide: this.model.toJSON(),
	    places: this.model.places().toJSON()
	}));
	return this;
    }
});
