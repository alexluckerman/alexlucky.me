var map, dirDisplay, dirService, geocoder, pos, resp;
          var webEndpoint = "https://us-central1-maps-react-220002.cloudfunctions.net/routedoors_handler";
          
          // Initializes the map, called by the Google Maps API script once it has loaded
          function initMap() {
              console.log("initMap called");
              map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 39.83, lng: -98.58},
                  zoom: 4
              });
              geocoder = new google.maps.Geocoder();
              dirService = new google.maps.DirectionsService;
              dirDisplay = new google.maps.DirectionsRenderer;
              dirDisplay.setMap(map);
          }
          
          // Handles getting location
          function findLocHandler() {
              document.getElementById("origin").value = "Loading current location...";
              navigator.geolocation.getCurrentPosition(locationToAddress, function() { alert("We need permission to get your location. Please reload and try again.");})
          }
          
          // Takes user position data and calls the Google Maps Geocoder API to output a human-readable address
          function locationToAddress(posData) {
              console.log(posData);
              pos = new google.maps.LatLng(posData.coords.latitude, posData.coords.longitude);
              geocoder.geocode({location : pos}, function(retVal) {
                  document.getElementById("origin").value = retVal[0].formatted_address;
              });
              map.setCenter(pos);
              var marker = new google.maps.Marker({
                  position: pos,
                  map: map
              });
          }
  
          function toggleLoading() {
              if (document.getElementById("loading").style.display == "none") {
                  document.getElementById("loading").style.display = "flex";
                  document.getElementById("header").style.display = "none";
                  document.getElementById("map").style.display = "none";
              }
              else {
                  document.getElementById("loading").style.display = "none";
                  document.getElementById("header").style.display = "flex";
                  document.getElementById("map").style.display = "block";
              }
          }
  
          // Finds a route starting and ending at the provided origin of the desired distance
          function getRoutes() {
              // The web page to be fetched
              var reqParams = webEndpoint+"?origin="+document.getElementById("origin").value+"&dist="+document.getElementById("dist").value;
              
              // The fetch call and corresponding Promises
              toggleLoading();
              fetch(new Request(reqParams, {method: "POST"}))
              .then((response) => {
                  if(!response.ok) {
                    throw response;
                  }
                return response.json();
              }).then((resp) => {
              console.log(resp);
              // Takes the returned link to Google Maps and displays it in the header
              var linkElem = document.createElement("a");
              linkElem.appendChild(document.createTextNode("Open route in Google Maps"));
              linkElem.href = resp[resp.length-1];
              linkElem.target = "_blank";
              var mapUrl = document.getElementById("mapUrl");
              if (mapUrl.firstChild)
              mapUrl.removeChild(mapUrl.firstChild);
              mapUrl.appendChild(linkElem);
              
              // Turn all waypoints returned from the API call to LatLng objects
              var waypoints = [];
              for (var i = 1; i < resp.length-1; ++i) {
                  waypoints.push({ location: new google.maps.LatLng(resp[i][0], resp[i][1]), stopover: false});
              }
              // All of the parameters that make up the request to the DirectionsService
              pos = new google.maps.LatLng(resp[0][0], resp[0][1]);
              var request = {
                  origin: pos,
                  destination: pos,
                  travelMode: "WALKING",//getMode(),
                  waypoints: waypoints,
                  optimizeWaypoints: false,
                  provideRouteAlternatives: false
              };
              // Calls to the DirectionsService, takes the response and sends it to DirectionsRenderer
              dirService.route(request, function(response, status) {
                if (status === "OK") {
                  dirDisplay.setDirections(response);
                  console.log(response);
                }
                else {
                  console.log("Directions request failed: " + status);
                }
              });
              toggleLoading();
          }).catch((err) => {
              alert("An error occured. Please try again later");
              toggleLoading();
              console.log(err);
          });
        }