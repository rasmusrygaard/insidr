Insidr.Views.Category = Backbone.View.extend({
	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			category: this.model.attributes,
			guides: this.model.get('guides').toJSON()
		}));
		return this;
	}
});
