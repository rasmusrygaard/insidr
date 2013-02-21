window.Guide = Backbone.Model.extend({
    urlRoot: '/guides',
    
    idAttribute: 'id',

    initialize: function() {
	_.bindAll(this); 
    }
/*
    validate: function(attrs, options) {
	if (attrs.name.length == 0) {
	    return "name can't be empty";
	} else if (attrs.city.length == 0) {
	    return "city can't be empty";
	}
    }*/
});
