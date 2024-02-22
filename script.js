let map, directionsService, directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
        zoom: 12
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    document.getElementById('routeForm').addEventListener('submit', function (event) {
        event.preventDefault();
        calculateAndDisplayRoute();
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
