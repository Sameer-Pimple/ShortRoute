let directionsService, directionsRenderer, map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.139800, lng: 79.100082 }, // Default to MAHARASTRA coordinates
        zoom: 12
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    document.getElementById('map').addEventListener('submit', function (event) {
        event.preventDefault();
        calculateAndDisplayRoute();
    });
    const markerExists = localStorage.getItem('markerExists');

    if (markerExists === 'true') {
        // Remove the marker
        currentLocationMarker.setMap(null);
    }

    // Call getLocation to initiate fetching user's location
    getLocation();
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
    const Lat= position.coords.latitude;
    const long= position.coords.longitude;
    const accuracy= position.coords.accuracy;
    console.log(position.coords.latitude, position.coords.longitude, position.coords.accuracy);

    const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Your Position"
    });
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
        destination: address1, // Return to the starting point
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
