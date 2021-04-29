
const myMap = L.map("map", {
  center: [42.29622, -71.30576],
  zoom: 12,
  scrollWheelZoom: false
});

const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

const link = "static/data/boston_marathon.geojson";

d3.json(link).then(data =>
  L.geoJson(data).addTo(myMap)
)

const watchPoints = [{
  location: [42.22993, -71.51810],
  name: "Starting Line"
},
{
  location: [42.232314, -71.514391],
  name: "Hopkinton E Main St"
},
{
  location: [42.24328, -71.48487],
  name: "Ashland Woods"
},
{
  location: [42.26109, -71.46367],
  name: "Ashland House"
},
{
  location: [42.27277, -71.44528],
  name: "Framingham Fountain St"
},
{
  location: [42.27749, -71.40686],
  name: "Dennison Playground"
},
{
  location: [42.28362, -71.36807],
  name: "Fisk Pond"
},
{
  location: [42.30511, -71.28259],
  name: "Hunnewell Tennis Courts"
},
{
  location: [42.32111, -71.26260],
  name: "Warren Park"
},
{
  location: [42.33847, -71.20784],
  name: "Bullough's Pond"
},
{
  location: [42.33763, -71.17149],
  name: "Boston College"
},
{
  location: [42.33688, -71.14339],
  name: "Jean B. Waldstein Playground"
},
{
  location: [42.34954, -71.08629],
  name: "Hearthbreak Hill"
},
{
  location: [42.34890, -71.09230],
  name: "Charlesgate Park"
},
{
  location: [42.35132, -71.07777],
  name: "Finish Line"
},
];

const watchIcons = L.ExtraMarkers.icon({
  icon: "eye-outline",
  iconColor: "white",
  markerColor: "blue",
  shape: "star"
});

// Loop through the cities array and create one marker for each city, bind a
// popup containing its name and population add it to the map

for (let i = 0; i < watchPoints.length; i++) {
  const point = watchPoints[i];
  L.marker(point.location, {icon: watchIcons})
    .bindPopup("<h3>" + point.name)
    .addTo(myMap);
};

//////////////////////////////////////////////////////////////////////

// d3.json('/api').then(data =>
//   console.log(data)
// )
let runners
fetch('/api/scatter?series=Gender').then(response => response.json()).then(data => {

Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Scatter Plot Race Time by Age by Category'
    },
    subtitle: {
        text: 'Source: Kaggle Boston Marathon'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Age (years old)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Official Race Finish Time (HH:MM:SS)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} yrs old, {point.y} time'
            }
        }
    },
    series: [{
        name: 'Female',
        color: 'rgba(223, 83, 83, .5)',
        data: data.F

    }, {
        name: 'Male',
        color: 'rgba(119, 152, 191, .5)',
        data: data.M
    }]
});});

/////////////////////////////////////////////////////////////////////////////
