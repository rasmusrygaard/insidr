var GuidesView = Backbone.View.extend({
    initialize: function () {
	// Empty
    },

    render: function () {
	this.$el.html(this.template({ guides: this.model.toJSON() }));
	return this;
    }
});
