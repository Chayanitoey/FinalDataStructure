 mapboxgl.accessToken = 'pk.eyJ1IjoiY2hheWFuaXR0b2V5IiwiYSI6ImNrd3FsaDg5dDBudWkydXM2ZDA5OHZ1emoifQ.0Id53dpAEDVDWdpeeRGu6A';

      const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/chayanittoey/ckwy0lprc0sb214peecgycyh7',
        center: [-73.960924, 40.742670],
        zoom: 11.83
      });
      
          // const filterGroup = document.getElementById('filter-group');



    //   const marker = new mapboxgl.Marker() // Initialize a new marker
    //     .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
    //     .addTo(map); // Add the marker to the map

      const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: 'Search for places in Manhattan', // Placeholder text for the search bar
        // bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
        proximity: {
          longitude: -73.960924,
          latitude: 40.742670
        } // Coordinates of UC Berkeley
      });

      // Add the geocoder to the map
      map.addControl(geocoder);

      // After the map style has loaded on the page,
      // add a source layer and default styling for a single point

  
  map.on('load', () => {
  
  map.loadImage(
    './assets/icon.png',
    (error, image) => {
    if (error) throw error;
    map.addImage('custom-marker', image);
    // Add a GeoJSON source with 2 points
    map.addSource('all_meetings', {
    'type': 'geojson',
     data: 'https://raw.githubusercontent.com/Chayanitoey/Data-Structures/main/AA_meetingFinal/allmeetings.geojson'
    });
    

    // Add a symbol layer
    map.addLayer({
    'id': 'All Meetings',
    'type': 'symbol',
    'source': 'all_meetings',
    'layout': {
    'icon-image': 'custom-marker',
    'icon-size': 0.8,
    'visibility': 'visible'
    }});
    
map.on('click', 'All Meetings', (e) => {
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML( "Group Name: " + e.features[0].properties.groupData__groupName +" " + "<br>"
+"Location: " + e.features[0].properties.locationData__locationName  +" " 
+ "<br>"+"Address: " + e.features[0].properties.locationData__streetAddress 
+" " + "<br>"+"<br>"+"Start from " + e.features[0].properties.meetingData__1__startTime
+" " + e.features[0].properties.meetingData__1__startAMPM
+" "+"to " + e.features[0].properties.meetingData__1__endTime
+" " + e.features[0].properties.meetingData__1__endAMPM
+" " + "<br>"+ "Meeting Type: " + e.features[0].properties.meetingData__1__meetingType

+" " + "<br>"+ e.features[0].properties.meetingData__1__meetingTypeLong

+" " + "<br>"+"<br>"+"Wheelcair Access: " + e.features[0].properties.locationData__wheelChairAccess)



.addTo(map);
});
 
// Change the cursor to a pointer when
// the mouse is over the states layer.
map.on('mouseenter', 'All Meetings', () => {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change the cursor back to a pointer
// when it leaves the states layer.
map.on('mouseleave', 'All Meetings', () => {
map.getCanvas().style.cursor = '';
});


        // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', (event) => {
          map.getSource('single-point').setData(event.result.geometry);
        });
      });
    });