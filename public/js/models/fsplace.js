Insidr.Models.FSPlace = Backbone.Model.extend({

	parse: function (res) {
		var attr = {};
		attr.location = new Insidr.Models.Location(res.location);
		attr.fsId = res.id;
		attr.name = res.name;
		return attr;
	}
});