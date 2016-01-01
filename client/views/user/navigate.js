Template.navigate.onCreated(function(){
  GoogleMaps.ready('exampleMap', function(map) {
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
})

Template.navigate.helpers({
	exampleMapOptions: function() {
	    if (GoogleMaps.loaded()){
	      return {
	        center: new google.maps.LatLng(29.389240, 79.459691),
	        zoom: 8
	      };
	    }
	 }
})