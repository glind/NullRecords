<!DOCTYPE html>
<html>
    <head>
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>OpenLayers All Overlays with Google and OSM</title>
        <link rel="stylesheet" href="../openlayers/theme/default/style.css" type="text/css">
        <link rel="stylesheet" href="../openlayers/theme/default/google.css" type="text/css">
         <link rel="stylesheet" href="style.css" type="text/css">
        <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script src="http://localhost/~lind/openlayers/lib/OpenLayers.js"></script>
	     <script src="script.js"></script>
     </head>
    
    <body onload="init()">
        <h1 id="title">All Overlays with Google and OSM</h1>
        <div id="tags">
            overlay, baselayer, google, osm, openstreetmap
        </div>
        <p id="shortdesc">
            Using the Google and OSM layers as overlays.
        </p>
        <div id="map" class="smallmap"></div>
        <button id="locate">Locate me!</button>
        <input type="checkbox" name="track" id="track">
        <label for="track">Track my position</label>
    </body>
</html>