// const myMap = L.map("map", {
//   center: [42.29622, -71.30576],
//   zoom: 10
// });

// const link = "static/data/boston_marathon.geojson";
//
// d3.json(link).then(data =>
//   L.geoJson(data).addTo(myMap)
// )

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

const layers = {
  ROUTE_PATH: new L.LayerGroup(),
  WATCH_POINTS: new L.LayerGroup(),
  AID_POINTS: new L.LayerGroup()
};

const map = L.map("map", {
  center: [42.29622, -71.30576],
  zoom: 12,
  layers: [
    layers.ROUTE_PATH,
    layers.WATCH_POINTS,
    layers.AID_POINTS
  ]
});

lightmap.addTo(map);

const overlays = {
  "Route Path": layers.ROUTE_PATH,
  "Watch Points": layers.WATCH_POINTS,
  "Aid Stations": layers.AID_POINTS
};

L.control.layers(null, overlays).addTo(map);

const info = L.control({
  position: "bottomright"
});

info.onAdd = function() {
  const div = L.DomUtil.create("div", "legend");
  return div;
};

info.addTo(map);

const icons = {
  WATCH_POINTS: L.ExtraMarkers.icon({
    icon: "eye-outline",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  AID_POINTS: L.ExtraMarkers.icon({
    icon: "medkit-outline",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  })
};

const link = "static/data/boston_marathon.geojson";

// d3.json(link).then(data =>
//   L.geoJson(data).addTo(layers[])
// )
