mapboxgl.accessToken = 'pk.eyJ1IjoiaGFmaXl5YW5kaSIsImEiOiJjamY5dmY1c2gwbXowMnFvZmJlYmVibGd0In0.djzLVWymjTzvRF6XSFM7uQ';
var filterGroup = document.getElementById('filter-group');

var map2 = new mapboxgl.Map({
  container: 'map', // you need this
  style: 'mapbox://styles/mapbox/basic-v9', // you also need this
  center: [137.913539, 37.634859], // [long, lat] Different than leaflet, different than google maps, same as geojson!
  zoom: 5
});


// Source is where the data is coming from, layer is what you're going to do with it.
$.ajax({
  dataType: "json",
  url: "sakura.json",
  success: function(dataname) {

    map2.on('load', function() {
      // Add a GeoJSON source containing place coordinates and information.
      map2.addSource("dataname", {
        "type": "geojson",
        "data": dataname
      });

      dataname.features.forEach(function(feature) {
        var symbol = feature.properties['time'];
        var layerID = symbol;
        if (!map2.getLayer(layerID)) {
          map2.addLayer({
            'id': layerID,
            'type': 'circle',
            'source': 'dataname',
            'paint': {
              // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                'base': 8,
                'stops': [
                  [7, 8],
                  [20, 180]
                ]
              },
              'circle-color': '#FC4788',
              'circle-opacity': 0.6
            },
            "filter": ["==", 'time', symbol]
          });

          // Add checkbox and label elements for the layer.
          var input = document.createElement('input');
          input.type = 'checkbox';
          input.id = layerID;
          input.checked = true;
          filterGroup.appendChild(input);

          var label = document.createElement('label');
          label.setAttribute('for', layerID);
          label.textContent = symbol;
          filterGroup.appendChild(label);

          // When the checkbox changes, update the visibility of the layer.
          input.addEventListener('change', function(e) {
            map2.setLayoutProperty(layerID, 'visibility',
              e.target.checked ? 'visible' : 'none');
          });

          // Change the cursor to a pointer when the mouse is over the places layer.
          map2.on('mouseenter', layerID, function() {
            map2.getCanvas().style.cursor = 'pointer';
          });

          // Change it back to a pointer when it leaves.
          map2.on('mouseleave', layerID, function() {
            map2.getCanvas().style.cursor = '';
          });
        }
      });
    });


    map2.on('click', function(e) {
      var features = map2.queryRenderedFeatures(e.point);
      // console.log(features);

      var el = document.createElement('div');
      el.className = 'marker';

      el.style.backgroundImage = 'url(' + features[0].properties.img + ')';
      // el.style.backgroundImage = marker.properties.img;
      el.style.width = '60px';
      el.style.height = '60px';

      var popup = new mapboxgl.Popup()
        .setHTML('<h1>' + features[0].properties.place + '</h1><p>' + features[0].properties.time + '</p>');

      // add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(features[0].geometry.coordinates)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map2);
    });

  } //ajax success end
}).error(function() {});

map2.addControl(new MapboxDirections({
  accessToken: mapboxgl.accessToken
}), 'top-left');
