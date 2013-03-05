Insidr.Views.GuideForm = Backbone.View.extend({
	initialize: function () {
		Handlebars.registerHelper('isGuideCategory', function (guide, category, options) {
			if (guide !== undefined && category.id === guide.categoryId) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});
		this.render();
	},

	events: {
		'click #submitButton': 'save',
		'click #cancelButton': 'cancel'
	},

	cancel: function (e) {
		e.preventDefault();
		Backbone.history.navigate('/guides/' + this.model.guide.get('id'), {trigger: true});
	},

	save: function (e) {
		e.preventDefault();
		var newCategory = this.$('select[name=selectCategory]').val();
		var _this = this;
		this.model.guide.save({categoryId: newCategory}).success(function () {
			// Fix this
			_this.render();
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