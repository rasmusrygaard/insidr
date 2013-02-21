window.HomeView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
	this.render();
    },

    render: function () {
	this.$el.html(this.template());
	return this;
    }
});
