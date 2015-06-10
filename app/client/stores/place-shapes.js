var Reflux = require('reflux'),
  Immutable = require('immutable'),
  d3 = require('d3'),
  placesStore = require('./places'),
  visStore = require('./vis'),
  PlaceShape = require('../models/place-shape'),
  Point = require('../models/point');

module.exports = Reflux.createStore({
  init: function() {
    this.placeShapes = Immutable.OrderedMap();

    this.map = null;

    this.radiusScale = d3.scale.pow().exponent(.25).range([10, 100]);
    this.strokeWidthScale = d3.scale.pow().exponent(.25).range([1, 10]);

    this.listenTo(placesStore, this.setPlaces);
    this.listenTo(visStore, this.onVisChange);
  },

  setPlaces: function(places) {
    var minDuration = Infinity,
      maxDuration = -Infinity,
      minFrequency = Infinity,
      maxFrequency = -Infinity;

    places.forEach(function(place) {
      var frequency = place.stays.size;

      minDuration = Math.min(minDuration, place.duration);
      maxDuration = Math.max(maxDuration, place.duration);
      minFrequency = Math.min(minFrequency, frequency);
      maxFrequency = Math.max(maxFrequency, frequency);
    });

    var map = this.map,
      radiusScale = this.radiusScale.domain([minDuration, maxDuration]),
      strokeWidthScale = this.strokeWidthScale.domain([minFrequency, maxFrequency]);

    this.placeShapes = places.toSeq()
      .map(function(place) {
        var point;

        if (map != null)
          point = new Point(map.latLngToLayerPoint(place.location));

        return new PlaceShape({
          id: place.id,
          place: place,
          radius: radiusScale(place.duration),
          strokeWidth: strokeWidthScale(place.stays.size),
          point: point
        });
      })
      .sortBy(function(placeShape) {
        return -placeShape.radius;
      })
      .toOrderedMap();

    this.trigger(this.placeShapes);
  },

  setMap: function(map) {
    this.map = map;

    this.placeShapes = this.placeShapes.map(function(placeShape) {
      var point = new Point(map.latLngToLayerPoint(placeShape.place.location));

      return placeShape.mergeDeep({ point: point });
    });

    this.trigger(this.placeShapes);
  },

  onVisChange: function(vis) {
    this.setMap(vis.get('map'));
  },

  getInitialState: function() {
    return this.placeShapes;
  }
});