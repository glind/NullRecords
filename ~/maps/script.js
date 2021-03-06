
	    	var map;
	    	var style = {
			    	    fillColor: '#000',
			    	    fillOpacity: 0.1,
			    	    strokeWidth: 0
			    	};
	
		    function init() {
		
		        map = new OpenLayers.Map({
		            div: "map",
		            allOverlays: true
		        });
		
		        var osm = new OpenLayers.Layer.OSM();
		        var gmap = new OpenLayers.Layer.Google("Google Streets", {visibility: false});
		        var vector = new OpenLayers.Layer.Vector('vector');
		        var kml = new OpenLayers.Layer.GML("KML", "BikeThere.kmz", 
	               {
	                format: OpenLayers.Format.KML, 
	                formatOptions: {
	                  extractStyles: true, 
	                  extractAttributes: true,
	                  maxDepth: 2
	                }
	               });
		
		        // note that first layer must be visible
		        map.addLayers([osm, gmap, kml]);
		
		        map.addControl(new OpenLayers.Control.LayerSwitcher());
		        map.zoomToMaxExtent();
		   

		    	map.setCenter(
		    	    new OpenLayers.LonLat(-122.675, 45.5236111).transform(
		    	        new OpenLayers.Projection("EPSG:4326"),
		    	        map.getProjectionObject()
		    	    ), 12
		    	);

		    	var pulsate = function(feature) {
		    	    var point = feature.geometry.getCentroid(),
		    	        bounds = feature.geometry.getBounds(),
		    	        radius = Math.abs((bounds.right - bounds.left)/2),
		    	        count = 0,
		    	        grow = 'up';

		    	    var resize = function(){
		    	        if (count>16) {
		    	            clearInterval(window.resizeInterval);
		    	        }
		    	        var interval = radius * 0.03;
		    	        var ratio = interval/radius;
		    	        switch(count) {
		    	            case 4:
		    	            case 12:
		    	                grow = 'down'; break;
		    	            case 8:
		    	                grow = 'up'; break;
		    	        }
		    	        if (grow!=='up') {
		    	            ratio = - Math.abs(ratio);
		    	        }
		    	        feature.geometry.resize(1+ratio, point);
		    	        vector.drawFeature(feature);
		    	        count++;
		    	    };
		    	    window.resizeInterval = window.setInterval(resize, 50, point, radius);
		    	};

		    	var geolocate = new OpenLayers.Control.Geolocate({
		    	    geolocationOptions: {
		    	        enableHighAccuracy: false,
		    	        maximumAge: 0,
		    	        timeout: 7000
		    	    }
		    	});
		    	map.addControl(geolocate);
		    	geolocate.events.register("locationupdated",this,function(e) {
		    	    vector.removeAllFeatures();
		    	    var circle = new OpenLayers.Feature.Vector(
		    	        OpenLayers.Geometry.Polygon.createRegularPolygon(
		    	            new OpenLayers.Geometry.Point(e.point.x, e.point.y),
		    	            e.position.coords.accuracy/2,
		    	            40,
		    	            0
		    	        ),
		    	        {},
		    	        style
		    	    );
		    	    vector.addFeatures([
		    	        new OpenLayers.Feature.Vector(
		    	            e.point,
		    	            {},
		    	            {
		    	                graphicName: 'cross',
		    	                strokeColor: '#f00',
		    	                strokeWidth: 2,
		    	                fillOpacity: 0,
		    	                pointRadius: 10
		    	            }
		    	        ),
		    	        circle
		    	    ]);
		    	    map.zoomToExtent(vector.getDataExtent());
		    	    pulsate(circle);
		    	});
		    	geolocate.events.register("locationfailed",this,function() {
		    	    OpenLayers.Console.log('Location detection failed');
		    	});

		    	$('locate').onclick = function() {
		    	    vector.removeAllFeatures();
		    	    geolocate.deactivate();
		    	    $('track').checked = false;
		    	    geolocate.watch = false;
		    	    geolocate.activate();
		    	};
		    	$('track').onclick = function() {
		    	    vector.removeAllFeatures();
		    	    geolocate.deactivate();
		    	    if (this.checked) {
		    	        geolocate.watch = true;
		    	        geolocate.activate();
		    	    }
		    	};
		    	$('track').checked = false;
}