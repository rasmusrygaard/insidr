window.HomeView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
	this.render();
    },

    render: function () {
	console.log(this.$el);
	this.$el.html(this.template());
	return this;
    }
});
