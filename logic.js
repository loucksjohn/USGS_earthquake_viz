function markerSize(mag) {
    return mag * 20000;
}


function markerColor(depth) {}


var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(queryURL, function(data) {  
    console.log(data)  
createFeatures(data.features);
});
  
function createFeatures(earthquakeData) {
  
    var earthquakes = L.geoJSON(earthquakeData, {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup and create circle marker for each quake
   onEachFeature : function (feature, mapObject) {  
    mapObject.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
        "<p> Magnitude: " +  feature.properties.mag + "</p>")
      },     pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
          {radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.properties.mag),
          fillOpacity: .9,
          stroke: true,
          color: "gray",
          weight:0.7,
        })
    }
    })
    createMap(earthquakes); 
};

function createMap(earthquakes) {

    // Define map layers
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
  });


    var baseMaps = {
        "Satellite Map": satellitemap,
        
    };

    var overlayMaps = {
        "Earthquakes": earthquakes,
        
    };

    var myMap = L.map("mapid", {
        center: [37.09,-95.75],
        zoom: 4,
        layers: [satellitemap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

}
