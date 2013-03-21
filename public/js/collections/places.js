Insidr.Collections.Places = Backbone.Collection.extend({
    model: Insidr.Models.Place,
    url: '/api/places',

    initialize: function () {
        this.requests = [];
        this.listenTo(this, "remove", this.setRemoved);
        this.listenTo(this, "add", this.setAdded);
    },

    setRemoved: function (model, collection, options) {
        this.requests.push({model: model, type: 'DELETE'});
    },

    setAdded: function (model, collection, options) {
        this.requests.push({model: model, type: 'POST'});
    },

    buildRequest: function (obj, guideId) {
        return {
            type: obj.type,
            url: '/api/guides/' + guideId + '/places/' + obj.model.get('id')
        };
        
    },

    /* Not quite working yet. Need to POST/DELETE to /api/guides/:id/places/:pid */
    save: function (guideId) {
        var _this = this;
        /* Build AJAX requests from each queued request. */
        var deferreds = _.map(this.requests, function (r) { 
            return $.ajax(_this.buildRequest(r, guideId)); 
        });
        $.when.apply(null, deferreds).done(function () {
            _this.requests = [];
        });
    }
});
