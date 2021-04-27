var myMap = L.map('map', {
  center: [38.9072, -77.0369],
  zoom: 13,
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY,
  }
).addTo(myMap);

var url = 'https://scooters.pythonanywhere.com/api/latest';

d3.json(url, function (res) {
  var heatArray = [];

  res.data.forEach((row) => heatArray.push([row.lat, row.lon]));

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35,
  }).addTo(myMap);
});

var metroLineURL = './static/data/metro_lines.geojson';

d3.json(metroLineURL, (res) => {
  var colors = ['red', 'purple', 'green', 'black', 'brown', 'blue'];
  res.features.forEach((metro, i) => {
    var line = [];
    metro.geometry.coordinates.forEach((c) => line.push([c[1], c[0]]));
    L.polyline(line, {
      color: colors[i],
    }).addTo(myMap);
  });
});

var metroStationUrl = './static/data/stations.json';
d3.json(metroStationUrl, (res) => {
  console.log(res.features[0]);

  res.features.forEach((f) => {
    L.circle([f.geometry.y, f.geometry.x], {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.75,
      radius: 20,
    }).addTo(myMap);
  });
});
