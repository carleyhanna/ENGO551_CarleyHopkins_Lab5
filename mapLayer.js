//Creating map and setting zoom
var map = L.map('map').setView([51.0496, -114.0715], 13);

// OSM layer
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; ' + mapLink + ' Contributors',
maxZoom: 18,
}).addTo(map);

//Creating a feature group to store the layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);


// Initialise the draw control
var drawControl = new L.Control.Draw({
edit: {
featureGroup: drawnItems
}
});
map.addControl(drawControl);
map.on('draw:created', function (e) {
var type = e.layerType,
layer = e.layer;
if (type === 'marker') {
layer.bindPopup('You dropped a mark!');
}
drawnItems.addLayer(layer);
});

//Make a geojson layer that will store the simplified lines
var createdLines = new L.geoJSON().addTo(map);

var Polyline, simplified;

//Saving the layer after the line has been drawn
map.on('draw:created', function(e){
  let type = e.layerType, layer = e.layer;
  Polyline = e.layer.toGeoJSON();
  drawnItems.addLayer(layer);
});
