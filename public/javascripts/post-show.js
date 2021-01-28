
mapboxgl.accessToken = 'pk.eyJ1IjoibWFrdHBuIiwiYSI6ImNra2M3M3BxbzBvMWYydnA1aXoyMXRudG4ifQ.Az_Afw4LaANwlV6EJ64twA';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: post.coordinates,   // starting position [lng, lat]
zoom: 10 // starting zoom
});

var el = document.createElement('div');
el.className = 'marker';



//make a marker for  our location and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<b><h3>' + post.title + '<b></h3><p>' + post.location + '</p>'))
.addTo(map);
