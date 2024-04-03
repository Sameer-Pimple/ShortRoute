
        function initMap() {
            // Coordinates to center the map (MAHARASTRA coordinates)
            const centerCoordinates = { lat: 21.118178, lng: 79.125082 };

            // Options for the map
            const mapOptions = {
                center: centerCoordinates,
                zoom: 12 // Adjust the zoom level as needed
            };

            // Create the map object
            const map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }