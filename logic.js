function markerSize(mag) {
    return mag * 20000;
}


function markerColor(depth) {
    if (depth <= 10) {
        return "#7CFC00";
    } else if (depth <= 30) {
        return "#ADFF2F";
    } else if (depth <= 50) {
        return "#FFD700";
    } else if (depth <= 70) {
        return "#FFA500";
    } else if (depth <= 90) {
        return "#FF8C00";
    } else {
        return "#FF0000";
    };


}


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
    mapObject.bindPopup("<h3>" + feature.properties.title +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
        "<p> Magnitude: " +  feature.properties.mag + "</p>" +
        "<p> Depth: " +  feature.geometry.coordinates[2] + "</p>")
      },     pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
          {radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.geometry.coordinates[2]),
          fillOpacity: .9,
          stroke: true,
          color: "gray",
          weight:0.7,
        })
    }
    })
    createMap(earthquakes); 
};

var tectonicPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

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

    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "dark-v10",
        accessToken: API_KEY      
    });
    // creating new layer and bringing in plate info from URL
    var plates = new L.LayerGroup();
    d3.json(tectonicPlates, function(plate){
        console.log(plate)
        L.geoJson(plate,{
        weight:3,
        color: "#FFA500",
        fillOpacity:0
        })
        .addTo(plates);
    });


    var baseMaps = {
        "Satellite Map": satellitemap,
        "Grayscale": grayscale,
        "Dark Map": dark
    };

    var overlayMaps = {
        "Earthquakes": earthquakes,
        "Tectonic Plates": plates
    };

    var myMap = L.map("mapid", {
        center: [40.167, -100.167],
        zoom: 4,
        layers: [satellitemap, earthquakes, plates]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    function getColor(d) {
        return d> 90 ? "#FF0000":
        d>70?"#FF8C00":
        d>50?"#FFA500":
        d>30?"#FFD700":
        d>10? "#ADFF2F":
        d? "#7CFC00":
        "FFEDA0"
    };

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        depths= [0,10,30,50,70,90],
        labels=[];
    //Loop through depth values scale in legend
    for (var i = 0; i < depths.length; i++) {
    div.innerHTML += 
    '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' 
    + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    };
    return div;
    
    };
    
      legend.addTo(myMap);

    

}
