let directionsService, directionsRenderer, map;
let currentLocationMarker, Circle;
let sourceAutocomplete, desAutocomplte;// Declare a variable to hold the current location marker

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.139800, lng: 79.100082 }, // Default to MAHARASTRA coordinates
        zoom: 12
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    sourceAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('source')
    )
    desAutocomplte = new google.maps.places.Autocomplete(
        document.getElementById('dest')
    )

    document.getElementById('map-form').addEventListener('submit', function (event) {
        event.preventDefault();
        calculateAndDisplayRoute();
    });

    document.getElementById('detect-location').addEventListener('click', function () {
        // Call getLocation to initiate fetching user's location
        getLocation();
    });

    // Check if the marker exists in localStorage and remove it if it does
    const markerExists = localStorage.getItem('markerExists');
    if (markerExists === 'true') {
        currentLocationMarker.setMap(null);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation Not Supported");
    }
}

function showPosition(position) {
    const myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

    if (currentLocationMarker) {
        // If marker exists, update its position
        currentLocationMarker.setPosition(myLatLng);
        map.setCenter(myLatLng);
    } else {
        // If marker doesn't exist, create a new one
        currentLocationMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon:  "MarIcon1.png",
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
    const address1 = document.getElementById('address1').value;
    const address2 = document.getElementById('address2').value;
    const address3 = document.getElementById('address3').value;
    const address4 = document.getElementById('address4').value;

    const waypoints = [
        { location: address2, stopover: true },
        { location: address3, stopover: true },
        { location: address4, stopover: true }
    ];

    const request = {
        origin: address1,
        destination: address2, // Return to the starting point
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function (result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
window.initMap = initMap;
