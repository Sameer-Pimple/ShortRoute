let directionsService, directionsRenderer, map;
let currentLocationMarker, Circle;
let input, autocomplete;
let myLatLng;// Declare a variable to hold the current location marker

function initMapAndAutocomplete() {
    initAutocomplete(),initMap();
  }

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.139800, lng: 79.100082 }, // Default to MAHARASTRA coordinates
        zoom: 12
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Check if the marker exists in localStorage and remove it if it does
    const markerExists = localStorage.getItem('markerExists');
    if (markerExists === 'true') {
        currentLocationMarker.setMap(null);
    }
}
function initAutocomplete() {
    const inputBoxes = document.querySelectorAll('input[type="text"]');
    inputBoxes.forEach(function(input) {
        new google.maps.places.Autocomplete(input);
    });
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation Not Supported");
    }
}

function showPosition(position) {
    myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
    console.log(myLatLng);
    if (currentLocationMarker) {
        // If marker exists, update its position
        currentLocationMarker.setPosition(myLatLng);
        map.setCenter(myLatLng);
    } else {
        // If marker doesn't exist, create a new one
        currentLocationMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: "/Project/Assets/MarIcon1.png",
            animation: google.maps.Animation.BOUNCE,
            title: "Your Position"
        });
        Circle = new google.maps.Circle({
            strokeColor: '#95cbfb',
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: '#95cbfb',
            fillOpacity: 0.35,
            map: map,
            center: myLatLng,
            radius: 150
          });
        map.setCenter(myLatLng);
    }
    // Set markerExists in localStorage to true to indicate the presence of the marker
    localStorage.setItem('markerExists', 'true');
}

function calculateAndDisplayRoute() {
    const origin = myLatLng;
    const destination = document.getElementById('address2').value;
    const waypoints = [
        { location: document.getElementById('address3').value, stopover: true },
        { location: document.getElementById('address4').value, stopover: true }
    ];

    const request = {
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true,
        avoidHighways: true,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC, // Change to IMPERIAL for miles/feet
    };

    directionsService.route(request, function (result, status) {
        if (status === 'OK') {
            // Render the directions
            directionsRenderer.setDirections(result);

            // Extract and display distance information
            const leg = result.routes[0].legs[0]; // First leg of the first route
            const totalDistance = leg.distance.text; // Distance in user-friendly format
            console.log("Total Distance:", totalDistance);

            // Example: Show the distance in an HTML element
            const distanceDisplay = document.getElementById('distanceDisplay');
            distanceDisplay.innerText = `Total Distance: ${totalDistance}`;

        } else {
            console.error('Directions request failed due to ' + status);
        }
    });
}

window.initMap = initMap;
