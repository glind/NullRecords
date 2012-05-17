function initialize(find_location) {

	if(find_location == "New York"){
		var location = new google.maps.LatLng(40.76234,-73.98022);
	}else if (find_location == "Chicago"){
		var location = new google.maps.LatLng(41.8756,-87.6242);
	}else if (find_location == "SF"){
		var location = new google.maps.LatLng(37.476111,-122.2600);
	}else {
		var location = new google.maps.LatLng(45.5236111,-122.675);
		find_location == "Portland";
	}
	
	var myOptions = {
	  zoom: 10,
	  center: location,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);
	 
	if(find_location == "New York"){
		var BikeMapLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/nyc/NYC-Bike.kml');
		BikeMapLayer.setMap(map);
		var BikeParkingLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/chicago/Chicago-cityracks.kml');
		BikeParkingLayer.setMap(map);
	}else if (find_location == "Chicago"){
		//var BikeMapLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/chicago/Chicago-bikeroutes.kml');
		//BikeMapLayer.setMap(map);
		var BikeParkingLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/chicago/Chicago-Bike-Parking.kml');
		BikeParkingLayer.setMap(map);
		
	} else if (find_location == "Portland"){
		var BikeMapLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/pdx/bike_pdx_metro.kml');
		BikeMapLayer.setMap(map);
		var BikeParkingLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/pdx/bike_parking.kml');
		BikeParkingLayer.setMap(map);
	} else if (find_location == "SF"){
		//var BikeMapLayer = new google.maps.KmlLayer('http://www.veloguide.com/sites/veloguide.com/files/kml/sf/SF-Bike-Routes.kml');
		//BikeMapLayer.setMap(map);
	}

}
