window.Categories = Backbone.Collection.extend({
	model: Category,
	url: '/api/categories',
	defaults: {
		name: ''
	}
})