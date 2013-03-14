Insidr.Views.GuideForm = Backbone.View.extend({
	initialize: function () {
		Handlebars.registerHelper('isGuideCategory', function (guide, category, options) {
			if (guide !== undefined && category.id === guide.categoryId) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});
		this.listenTo(this.model.guide, 'change', this.render);
		this.listenTo(this.model.categories, 'reset', this.render);
		this.render();
	},

	events: {
		'click #submitButton': 'save',
		'click #cancelButton': 'cancel',
		'click #placesButton': 'editPlaces'
	},

	cancel: function (e) {
		e.preventDefault();
		Backbone.history.navigate('/guides/' + this.model.guide.get('id'), {trigger: true});
	},

	editPlaces: function (e) {
		e.preventDefault();
		Backbone.history.navigate('/guides/' + this.model.guide.get('id') + '/places/edit', {trigger: true});
	},

	save: function (e) {
		e.preventDefault();
		var newCategory = this.$('select[name=selectCategory]').val();
		var newName = this.$('input[name=name]').val();
		var newDescription = this.$('textarea[name=description]').val();
		var _this = this;
		this.model.guide.save({categoryId: newCategory, name: newName, description: newDescription}, {
			success: function () {
				Insidr.Dispatcher.trigger('show_message', 'Guide updated!', 'success');
			}, error: function (model, xhr, options) {
				Insidr.Dispatcher.trigger('show_message', 'Error: ' + xhr.error(), 'error');
			}
		});
	},

	render: function () {
		this.$el.html(this.template({
			guide: this.model.guide.toJSON(),
			categories: this.model.categories.toJSON()
		}));
		return this;
	}
});