var Insidr = new (Backbone.View.extend({
    Models: {},
    Views: {},
    Collections: {},
    Router: {},
    events: {
        "click a": function(e) {
            e.preventDefault(), Backbone.history.navigate(e.target.pathname, {
                trigger: !0
            });
        }
    },
    start: function() {
        utils.loadTemplate([ "Guide", "Header", "Home", "Guides", "GuideForm", "Place", "Location", "Locations", "Category", "Categories", "FSPlaces", "PlaceForm", "PlacesForm" ], function() {
            new Insidr.Router(), Backbone.history.start({
                pushState: !0
            });
        });
    }
}))({
    el: document.body
});

Insidr.Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "foo/:id": "guideDetails",
        guides: "showGuides",
        "guides/new": "newGuide",
        "guides/:id": "showGuide",
        "guides/:id/edit": "editGuide",
        "guides/:id/places/edit": "editGuidePlaces",
        "places/add": "addPlace",
        "places/search/:query": "searchPlaces",
        "places/:id": "showPlace",
        "categories/:id": "showCategory",
        categories: "showCategories"
    },
    initialize: function() {
        this.headerView = new Insidr.Views.Header(), $(".header").html(this.headerView.render().el);
    },
    getCategories: function() {
        return this._categories || (this._categories = new Insidr.Collections.Categories(), 
        this._categories.fetch()), this._categories;
    },
    home: function() {
        this.homeView || (this.homeView = new Insidr.Views.Home({
            model: this.getCategories()
        })), $("#content").html(this.homeView.el);
    },
    showCategories: function() {
        var e = new Insidr.Views.Categories({
            model: this.getCategories()
        });
        $("#content").html(e.el);
    },
    showGuides: function() {
        var e = new Insidr.Collections.Guides();
        e.fetch({
            success: function() {
                var t = new Insidr.Views.Guides({
                    model: e
                });
                $("#content").html(t.el);
            }
        });
    },
    showCategory: function(e) {
        var t = new Insidr.Models.Category({
            id: e
        });
        t.fetch({
            success: function(e) {
                var t = new Insidr.Views.Category({
                    model: e
                });
                $("#content").html(t.render().el);
            }
        });
    },
    showGuide: function(e) {
        var t = new Insidr.Models.Guide({
            id: e,
            getLocations: !0
        });
        t.fetch({
            success: function() {
                var e = new Insidr.Views.Guide({
                    model: t
                });
                $("#content").html(e.render().el);
            }
        });
    },
    addPlace: function() {
        var e = new Insidr.Views.PlaceForm();
        $("#content").html(e.el);
    },
    searchPlaces: function(e) {
        var t = new Insidr.Collections.FSPlaces();
        t.setNear("Stanford,CA"), t.setQuery(e), t.fetch({
            success: function() {
                ppp = t;
                var e = new Insidr.Views.FSPlaces({
                    model: t
                });
                $("#content").html(e.el), setTimeout(function() {
                    alert("removing"), t.remove(t.at(0));
                }, 1e3);
            }
        });
    },
    editGuide: function(e) {
        var t = new Insidr.Models.Guide({
            id: e
        }), i = this;
        t.fetch({
            success: function() {
                var e = new Insidr.Views.GuideForm({
                    model: {
                        guide: t,
                        categories: i.getCategories()
                    }
                });
                $("#content").html(e.el);
            }
        });
    },
    editGuidePlaces: function(e) {
        var t = new Insidr.Models.Guide({
            id: e,
            getLocations: !0
        });
        t.fetch({
            success: function() {
                var e = new Insidr.Views.PlacesForm({
                    model: {
                        guide: t,
                        places: t.getPlaces()
                    }
                });
                $("#content").html(e.el);
            }
        });
    },
    newGuide: function() {
        var e = new Insidr.Models.Guide(), t = new Insidr.Views.GuideForm({
            model: {
                guide: e,
                categories: this.getCategories()
            }
        });
        $("#content").html(t.el);
    },
    guideDetails: function(e) {
        var t = new Insidr.Models.Guide({
            id: e
        });
        t.fetch().success(function() {
            var e = new Insidr.Views.Guide({
                model: t
            });
            $("#content").html(e.render().el);
        });
    },
    showPlace: function(e) {
        var t = new Insidr.Models.Place({
            id: e
        });
        t.fetch().success(function() {
            var e = new Insidr.Views.Place({
                model: t
            });
            $("#content").html(e.render().el);
        });
    }
}), $(document).ready(function() {
    Insidr.start();
}), window.utils = {
    loadTemplate: function(e, t) {
        var i = [];
        $.each(e, function(e, t) {
            Insidr.Views[t] ? i.push($.get("/templates/" + t + "View.handlebars", function(e) {
                Insidr.Views[t].prototype.template = Handlebars.compile(e);
            })) : alert("View not found: " + t);
        }), $.when.apply(null, i).done(t);
    },
    addRoute: function(e, t, i) {
        require("./routes/" + e)(i.app);
    }
}, Insidr.Models.Category = Backbone.Model.extend({
    urlRoot: "/api/categories",
    initialize: function() {
        void 0 === this.collection && this.set({
            guides: this.getGuides()
        });
    },
    getGuides: function() {
        var e = new Insidr.Collections.Guides();
        return e.url = "/api/categories/" + this.get("id") + "/guides", e.fetch({
            async: !1
        }), e;
    }
}), Insidr.Models.FSPlace = Backbone.Model.extend({
    parse: function(e) {
        var t = {};
        return t.location = new Insidr.Models.Location(e.location), t.fsId = e.id, t.name = e.name, 
        t;
    }
}), Insidr.Models.Guide = Backbone.Model.extend({
    urlRoot: "/api/guides",
    idAttribute: "id",
    initialize: function() {
        void 0 === this.collection && (this.places = this.getPlaces());
    },
    defaults: {
        getLocations: !1
    },
    getPlaces: function() {
        if (!this._places) {
            this._places = new Insidr.Collections.Places(), this._places.url = this.urlRoot + "/" + this.get("id") + "/places?", 
            this.get("getLocations") && (this._places.url += "locations=true"), this._places.fetch({
                async: !1
            });
            var e = this;
            _.each(this._places.models, function(t) {
                t.set({
                    guideId: e.get("id")
                });
            });
        }
        return this._places;
    }
}), Insidr.Models.Location = Backbone.Model.extend({
    urlRoot: "/api/locations"
}), Insidr.Models.Place = Backbone.Model.extend({
    urlRoot: "/api/places",
    initialize: function() {
        this.set({
            location: this.getLocation()
        });
    },
    getLocation: function() {
        if (this.has("location")) return void 0 !== this.get("location").parse ? this.get("location") : new Insidr.Models.Location(this.get("location"));
        var e = new Insidr.Models.Location();
        return e.url = this.urlRoot + "/" + this.get("id") + "/locations", e.fetch({
            async: !1
        }), e;
    }
}), Insidr.Views.Categories = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "reset", this.render), this.render();
    },
    render: function() {
        return this.$el.html(this.template({
            categories: this.model.toJSON()
        })), this;
    }
}), Insidr.Views.Category = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        return this.$el.html(this.template({
            category: this.model.attributes,
            guides: this.model.get("guides").toJSON()
        })), this;
    }
}), Insidr.Views.FSPlaces = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "reset", this.render), this.render();
    },
    events: {
        "click a": "triggerSelection"
    },
    triggerSelection: function(e) {
        var t = this.model.where({
            fsId: e.target.id
        })[0];
        this.trigger("placeSelected", t);
    },
    render: function() {
        this.$el.html(this.template({
            places: this.model.toJSON()
        }));
    }
}), Insidr.Views.GuideForm = Backbone.View.extend({
    initialize: function() {
        Handlebars.registerHelper("isGuideCategory", function(e, t, i) {
            return void 0 !== e && t.id === e.categoryId ? i.fn(this) : i.inverse(this);
        }), this.render();
    },
    events: {
        "click #submitButton": "save",
        "click #cancelButton": "cancel",
        "click #placesButton": "editPlaces"
    },
    cancel: function(e) {
        e.preventDefault(), Backbone.history.navigate("/guides/" + this.model.guide.get("id"), {
            trigger: !0
        });
    },
    editPlaces: function(e) {
        e.preventDefault(), Backbone.history.navigate("/guides/" + this.model.guide.get("id") + "/places/edit", {
            trigger: !0
        });
    },
    save: function(e) {
        e.preventDefault();
        var t = this.$("select[name=selectCategory]").val(), i = this;
        this.model.guide.save({
            categoryId: t
        }).success(function() {
            i.render();
        });
    },
    render: function() {
        return this.$el.html(this.template({
            guide: this.model.guide.toJSON(),
            categories: this.model.categories.toJSON()
        })), this;
    }
}), Insidr.Views.Guide = Backbone.View.extend({
    initialize: function() {
        this.locationsView = new Insidr.Views.Locations({
            model: _.map(this.model.places.models, function(e) {
                return e.get("location");
            })
        });
    },
    events: {
        "click #editButton": "edit"
    },
    edit: function() {
        Backbone.history.navigate("/guides/" + this.model.get("id") + "/edit", {
            trigger: !0
        });
    },
    render: function() {
        return Handlebars.registerHelper("address", function(e) {
            return e.location.get("address");
        }), Handlebars.registerHelper("postalCode", function(e) {
            return e.location.get("postalCode");
        }), this.$el.html(this.template({
            guide: this.model.toJSON(),
            places: this.model.places.toJSON()
        })), this.$el.find("#location").html(this.locationsView.render().el), this;
    }
}), Insidr.Views.Guides = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        return this.$el.html(this.template({
            guides: this.model.toJSON()
        })), this;
    }
}), Insidr.Views.Header = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        return this.$el.html(this.template()), this;
    }
}), Insidr.Views.Home = Backbone.View.extend({
    tagName: "div",
    initialize: function() {
        this.listenTo(this.model, "reset", this.render), this.render();
    },
    render: function() {
        return this.$el.html(this.template({
            categories: this.model.toJSON()
        })), this;
    }
}), Insidr.Views.Location = Backbone.View.extend({
    initialize: function() {
        this.latlng = new google.maps.LatLng(this.model.get("lat"), this.model.get("lng")), 
        this.mapOptions = {
            center: this.latlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }, this.boundsChanged = !1, this.render();
    },
    render: function() {
        this.$el.html(this.template({
            location: this.model.attributes
        }));
        var e = new google.maps.Map(this.$el.find("#map_canvas")[0], this.mapOptions);
        new google.maps.Marker({
            position: this.latlng,
            map: e,
            title: "Testing!"
        });
        var t = this;
        return google.maps.event.addListener(e, "bounds_changed", function() {
            t.boundsChanged = !0;
        }), google.maps.event.addListener(e, "idle", function() {
            google.maps.event.trigger(e, "resize"), alert("idle"), t.boundsChanged || e.setCenter(t.latlng);
        }), this;
    }
}), Insidr.Views.Locations = Backbone.View.extend({
    initialize: function() {
        this.setMapBoundaries(), this.latlng = new google.maps.LatLng((this.minLat + this.maxLat) / 2, (this.minLng + this.maxLng) / 2), 
        this.mapOptions = {
            center: this.latlng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }, this.render();
    },
    setMapBoundaries: function() {
        this.minLat = this.maxLat = this.minLng = this.maxLng = null, _.each(this.model, function(e) {
            var t = e.get("lat"), i = e.get("lng");
            !this.minLat || this.minLat > t ? this.minLat = t : (!this.maxLat || t > this.maxLat) && (this.maxLat = t), 
            !this.minLng || this.minLng > i ? this.minLng = i : (!this.maxLng || i > this.maxLng) && (this.maxLng = i);
        }, this);
    },
    render: function() {
        this.$el.html(this.template({
            location: this.model.attributes
        }));
        var e = new google.maps.Map(this.$el.find("#map_canvas")[0], this.mapOptions);
        _.each(this.model, function(t) {
            var i = new google.maps.Marker({
                position: new google.maps.LatLng(t.get("lat"), t.get("lng")),
                map: e,
                title: "Testing!",
                name: t.address
            });
            google.maps.event.addListener(i, "click", function() {
                alert("click");
            });
        });
        var t = this;
        return google.maps.event.addListener(e, "bounds_changed", function() {
            t.boundsChanged = !0;
        }), google.maps.event.addListener(e, "idle", function() {
            google.maps.event.trigger(e, "resize"), t.boundsChanged || (e.setCenter(t.latlng), 
            t.boundsChanged = !1);
        }), this;
    }
}), Insidr.Views.PlaceForm = Backbone.View.extend({
    initialize: function() {
        this.placesList = new Insidr.Collections.FSPlaces(), this.placesList.setNear("San Francisco,CA"), 
        this.placesView = new Insidr.Views.FSPlaces({
            model: this.placesList
        }), this.render();
    },
    events: {
        submit: "updatePlaces"
    },
    render: function() {
        this.$el.html(this.template), this.placesView.setElement(this.$el.find("#fsPlaces"));
    },
    updatePlaces: function(e) {
        e.preventDefault();
        var t = $("input[name=place]").val();
        this.placesList.setQuery(t), this.placesList.fetch();
    }
}), Insidr.Views.Place = Backbone.View.extend({
    initialize: function() {
        this.locationView = new Insidr.Views.Location({
            model: this.model.get("location")
        }), this.render();
    },
    render: function() {
        return this.$el.html(this.template({
            place: this.model.attributes
        })), this.$el.find("#location").html(this.locationView.render().el), this;
    }
}), Insidr.Views.PlacesForm = Backbone.View.extend({
    initialize: function() {
        this.placesList = new Insidr.Collections.FSPlaces(), this.placesList.setNear(this.model.guide.get("city")), 
        this.placesView = new Insidr.Views.FSPlaces({
            model: this.placesList
        }), this.listenTo(this.placesView, "placeSelected", this.addPlace), this.listenTo(this.model.places, "add", this.render), 
        this.listenTo(this.model.places, "remove", this.render), this.listenTo(this.model.places, "change", this.render), 
        this.render();
    },
    events: {
        "click li": "avoidRedirect",
        "submit #placeForm": "updatePlaces",
        "click #saveButton": "saveChanges",
        "click #cancelButton": "cancelChanges",
        "click .removeButton": "removePlace"
    },
    render: function() {
        this.$el.html(this.template({
            guide: this.model.guide.attributes,
            places: this.model.places.toJSON()
        })), this.placesView.setElement(this.$el.find("#fsPlaces"));
    },
    saveChanges: function(e) {
        e.preventDefault(), this.model.places.save();
    },
    cancelChanges: function(e) {
        e.preventDefault(), Backbone.history.navigate("/guides/" + this.model.guide.get("id") + "/edit", {
            trigger: !0
        });
    },
    removePlace: function(e) {
        e.preventDefault();
        var t = this.model.places.get(e.target.id);
        this.model.places.remove(t);
    },
    addPlace: function(e) {
        var t = new Insidr.Models.Place(e.attributes), i = t.get("location"), s = this;
        i.save(null, {
            success: function(e) {
                t.unset("location"), t.set({
                    guideId: s.model.guide.get("id")
                }), t.set({
                    locationId: e.get("id")
                }), t.save(null, {
                    success: function(e) {
                        t.set({
                            id: e.id
                        });
                    }
                }), t.set({
                    location: e
                }), s.model.places.add(t);
            },
            error: function() {}
        });
    },
    avoidRedirect: function(e) {
        e.preventDefault(), e.stopPropagation();
    },
    updatePlaces: function(e) {
        e.preventDefault();
        var t = $("input[name=place]").val();
        this.placesList.setQuery(t), this.placesList.fetch();
    }
}), Insidr.Collections.Categories = Backbone.Collection.extend({
    model: Insidr.Models.Category,
    url: "/api/categories"
}), Insidr.Collections.FSPlaces = Backbone.Collection.extend({
    model: Insidr.Models.FSPlace,
    url: function() {
        return "https://api.foursquare.com/v2/venues/search?client_id=VZ3PKSAQC0ZTWJ4BGXHDY3RLXWDZZKY1VDOOP1IIJHUSGE4P&client_secret=PMCW1KQWKIVDVFIGJPVQAFQIFNMGWOD42EQHD1W2W1SYKGQC&v=20130306&limit=15&near=" + this.near + "&query=" + this.query;
    },
    setNear: function(e) {
        this.near = e;
    },
    setQuery: function(e) {
        this.query = e;
    },
    parse: function(e) {
        return e.response.venues;
    }
}), Insidr.Collections.Guides = Backbone.Collection.extend({
    model: Insidr.Models.Guide,
    url: "/api/guides"
}), Insidr.Collections.Places = Backbone.Collection.extend({
    model: Insidr.Models.Place,
    url: "/api/places",
    initialize: function() {
        this.requests = [], this.listenTo(this, "remove", this.setRemoved), this.listenTo(this, "add", this.setAdded);
    },
    setRemoved: function(e) {
        this.requests.push({
            model: e,
            type: "DELETE"
        });
    },
    setAdded: function(e) {
        this.requests.push({
            model: e,
            type: "POST"
        });
    },
    buildRequest: function(e) {
        return {
            type: e.type,
            url: "/api/guides/" + e.model.get("guideId") + "/places/" + e.model.get("id")
        };
    },
    save: function() {
        var e = this, t = _.map(this.requests, function(t) {
            return $.ajax(e.buildRequest(t));
        });
        $.when.apply(null, t).done(function() {
            e.requests = [];
        });
    }
});