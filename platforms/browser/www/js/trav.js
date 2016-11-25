

var map;
      var infowindow;
      var service ;

      function initialize(lat,lng) 
      {
        var origin = new google.maps.LatLng(lat,lng);
       
        map = new google.maps.Map(document.getElementById('maparea'), {
          mapTypeId: google.maps.MapTypeId.HYBRID,
          center: origin,
          zoom: 18
        });
        
        var request = {
          location: origin,
          radius: 1000,
          types: ['bus_station']
        };
        infowindow = new google.maps.InfoWindow();
        infowindow.setPosition({ lat : lat,lng : lng});
        infowindow.setContent('Me');
        service = new google.maps.places.PlacesService(map);
        service.search(request, callback);
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
      
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        // console.log(place)

        //  Take this part and put it to the bus marker
        var url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&";

        url+="&key=AIzaSyD83jelR9_-yssrn_dbMcEKdC211qHhSFI";

        var time_taken;

        // $.getJSON(url+"origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626",function(j){
        //   // time_taken = j[0].rows.duration.text;
        //   console.log(i);
        // })
        var content='<strong style="font-size:1.2em">'+place.name+'</strong>'+
                    '<br/><strong>Latitude:</strong>'+placeLoc.lat()+
                    '<br/><strong>Longitude:</strong>'+placeLoc.lng()+
                    '<br/><strong>Type:</strong>'+place.types[0]+
                    '<br/><strong>Time needed:</strong>'+time_taken;
        var more_content='style-src';
        
        //make a request for further details
        service.getDetails({reference:place.reference}, function (place, status) 
        {
          if (status == google.maps.places.PlacesServiceStatus.OK) 
          {
            more_content='<hr/><strong><a href="#" id="marker_click" data-id="'+place.place_id+'"onclick=bus_stop_click(this)>Buses</a>';
          }
        });


        google.maps.event.addListener(marker, 'click', function() {
          
          infowindow.setContent(content+more_content);
          infowindow.open(map, this);

        });
      }

    function create_bus_marker(pos,time){
      var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
    }

  

    google.maps.event.addDomListener(window, 'load', function(){
           
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                initialize(position.coords.latitude,position.coords.longitude)

            }, function() {
                 handleLocationError(true, infoWindow, map.getCenter());
            });

    });

    
      var PUBNUB_demo = PUBNUB.init({
        publish_key: 'pub-c-0399b409-656b-4b39-b11a-b8ddec8f8c0e',
        subscribe_key: 'sub-c-e9cb18a6-b1b5-11e6-8319-02ee2ddab7fe'
      });
        

    function bus_stop_click(t){




        PUBNUB_demo.subscribe({
          channel: 'locus',
          message: function(m){
            // console.log(m.lat,m.lng)
            // initMap(m.lat,m.lng)
            // redraw(m.lat,m.lng)
          }
        });
        
    }


