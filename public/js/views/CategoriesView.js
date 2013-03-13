Insidr.Views.Categories = Backbone.View.extend({
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
