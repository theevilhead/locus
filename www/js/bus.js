
            var map,
                currentPositionMarker,
                mapCenter,
                map;

            var PUBNUB_demo = PUBNUB.init({
              publish_key: 'pub-c-0399b409-656b-4b39-b11a-b8ddec8f8c0e',
              subscribe_key: 'sub-c-e9cb18a6-b1b5-11e6-8319-02ee2ddab7fe'
            });

            function initializeMap()
            {
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 17,
                   center: mapCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
            }

            function locError(error) {
                // the current position could not be located
                alert("The current position could not be found!");
            }

            function setCurrentPosition(pos) {
                currentPositionMarker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ),
                    title: "Current Position"
                });
                map.panTo(new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ));
            }

            function displayAndWatch(position) {
                setCurrentPosition(position);
                watchCurrentPosition();
            }

            function watchCurrentPosition() {
                var positionTimer = navigator.geolocation.watchPosition(
                    function (position) {
                        setMarkerPosition(
                            currentPositionMarker,
                            position
                        );
                        console.log(position)
                        $("#trig").html('<p>lat'+position.coords.latitude +' | '+ position.coords.longitude+'</p>');
                        PUBNUB_demo.publish({
                          channel: 'locus',
                          message: { lat : position.coords.latitude,lng : position.coords.longitude }
                        });
                    });
            }

            function setMarkerPosition(marker, position) {
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
            }

            function initLocationProcedure() {
                initializeMap();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
                } else {
                    alert("Your browser does not support the Geolocation API");
                }
            }

            

            $(document).ready(function() {
                initLocationProcedure();
            });
