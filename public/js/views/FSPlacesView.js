Insidr.Views.FSPlaces = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, 'reset', this.render);
		this.render();
	},

	events: {
		'click a': 'triggerSelection'
	},

	triggerSelection: function (e) {
		var place = this.model.where({fsId: e.target.id})[0];
		this.trigger('placeSelected', place);
	},

	render: function () {
		this.$el.html(this.template({
			places: this.model.toJSON()
		}));
	}
});