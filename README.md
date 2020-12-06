# Leaflet Challenge

visualizing earthquake data w/ Leaflet

## 

![1-Logo](https://github.com/loucksjohn/leaflet_Challenge/blob/master/1-Logo.png?raw=trueImages/1-Logo.png)

## Description

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. This project's intent is to visualize their data, in turn, allowing them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes.  The map that I have created creates a visual representation of all the earthquakes (worldwide) for the past 30 days.

## Operating Instructions

In order to view the maps, you will need to input your MapBox API key in the config.js file. Once the API key has been input,  you can open the index.html file and view the map; data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.  Clicking on an earthquake marker will produce popups that provide additional information about the earthquake, like location/date & time/magnitude/etc. A second data set on the map illustrates the relationship between tectonic plates and seismic activity.

## Resources

In the GitHub repository for this project you will find all the resources necessary for the creation of this earthquake vizualization. Here's a quick rundown of those files and a brief explanation:

- config.js - this is where you MUST input your MapBox API key for the index.html file to run
- index.html - is the the webpage framework that displays the interactive chart in the browser
  - please note that within the index.html file you will find additional outside sources. Bootstrap is being referenced in the building of the webpage structure, D3 is being used as a source to manipulate the data in the files , and d3-tip is also being used as a source to help create the charts/graphs.
- logic.js - this is the javascript file that that is running in the HTML. in logic.js, I am reading in the data for the earthquakes and tectonic plates and then manipulating it so that it can be used to create the visualization.

## Author

John Loucks
Email: [johnloucks@gmail.com](mailto:johnloucks@gmail.com)
GitHub: https://github.com/loucksjohn