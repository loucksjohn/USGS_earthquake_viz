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
    // Give each feature a popup describing the place and time of the earthquake
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

