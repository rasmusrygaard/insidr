Insidr.Collections.FSPlaces = Backbone.Collection.extend({
    model: Insidr.Models.FSPlace,
    url: function () {
        return 'https://api.foursquare.com/v2/venues/search?' +
        'client_id=VZ3PKSAQC0ZTWJ4BGXHDY3RLXWDZZKY1VDOOP1IIJHUSGE4P&' +
        'client_secret=PMCW1KQWKIVDVFIGJPVQAFQIFNMGWOD42EQHD1W2W1SYKGQC&v=20130306&limit=15' +
        '&near=' + this.near + '&query=' + this.query;
    },

    setNear: function (near) {
        this.near = near;
    },

    setQuery: function (query) {
        this.query = query;
    },

    parse: function (res) {
        return res.response.venues;
    }
});
