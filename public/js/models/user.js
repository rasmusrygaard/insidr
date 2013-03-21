Insidr.Models.User = Backbone.Model.extend({
	url: function () {
		return 'https://www.googleapis.com/plus/v1/people/me?key=AIzaSyAQqHvxkQjPa1a7DR9gz6Wgtf_0Vpkx13Y';
	},

	initialize: function() {
		/* Empty */
	}

});