Insidr.Views.Home = Backbone.View.extend({
	tagName: 'div',

	initialize: function () {
		this.listenTo(this.model.categories, 'reset', this.render);
		this.render();
	},

	render: function () {
		this.$el.html(this.template({
			categories: this.model.categories.toJSON(),
			guides: _.first(_.shuffle(this.model.guides), 3)
		}));
		return this;
	}
});
