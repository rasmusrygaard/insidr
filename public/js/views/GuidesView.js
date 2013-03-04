Insidr.Views.Guides = Backbone.View.extend({
	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			guides: this.model.toJSON() 
		}));
		return this;
	}
});
