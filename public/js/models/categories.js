Insidr.Collections.Categories = Backbone.Collection.extend({
	model: Insidr.Models.Category,
	url: '/api/categories',
	defaults: {
		name: ''
	}
})