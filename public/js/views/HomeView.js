Insidr.Views.Home = Backbone.View.extend({
	tagName: 'div',

	initialize: function () {
		this.listenTo(this.model, 'reset', this.render);
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			categories: this.model.toJSON()
		}));
		return this;
	}
});
