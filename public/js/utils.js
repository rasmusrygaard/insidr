window.utils = {
    loadTemplate: function(views, callback) {
	var deferreds = [];

	$.each(views, function(index, view) {
	    if (window[view]) {
		deferreds.push($.get('/templates/' + view + '.handlebars', function (data) {
		    window[view].prototype.template = Handlebars.compile(data);
		}))
	    } else {
		alert('View not found: ' + view);
	    }
	});

	$.when.apply(null, deferreds).done(callback);
    },

    /* Load a route through require. CONTEXT should contain app. */
    addRoute: function (route, index, context) {
	require('./routes/' + route)(context.app);
    }
}
