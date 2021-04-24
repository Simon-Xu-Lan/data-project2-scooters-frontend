// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
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

var url = 'http://scooters.pythonanywhere.com/api/recent_hours/1';

d3.json(url, function (res) {
  // console.log(res);
  console.log(Object.values(res.data));
  Object.values(res.data).forEach((row) => {
    L.polyline(row.coordinates, {
      color: 'red',
    }).addTo(myMap);
  });
});
