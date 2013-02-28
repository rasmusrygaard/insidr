window.Category = Backbone.Model.extend({
	urlRoot: '/api/categories',

	initialize: function () {
		if (this.collection === undefined)
			this.set({ 'guides': this.getGuides() });
	},

	getGuides: function () {
		var guides = new Guides();
		guides.url = '/api/categories/' + this.get('id') + '/guides';
		guides.fetch({ async: false });
		return guides;
	}
});