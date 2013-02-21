var GuidesView = Backbone.View.extend({
    initialize: function () {
	// Empty
    },

    render: function () {
	console.log(this.model.toJSON());
	this.$el.html(this.template({ guides: this.model.toJSON() }));
	return this;
    }
});
