// ymaps.ready(init);
// var myMap, myPlacemark;

// function init(long,lat){ 
//     myMap = new ymaps.Map("map", {
//         center: [long, lat], zoom: 17
//     });

//     myPlacemark = new ymaps.Placemark([long, lat], { hintContent: '', balloonContent: ''});
            
//     myMap.geoObjects.add(myPlacemark);
// }
        // add api key
mapfit.apikey = "591dccc4e499ca0001a4c6a4210bef78fba742febd8159692e44c239";

// draw map
let map = mapfit.MapView('mapfit', {theme: 'day'});

//set zoom
map.setZoom(13); 

let map = mapfit.MapView('mapfit', {theme: 'day'});

//set zoom
map.setZoom(13); 

// create marker
position = mapfit.LatLng([40.745934, -73.988280]);
myMarker = mapfit.Marker(position);

//set the map center on marker position
map.setCenter(position);

//add marker to map
map.addMarker(myMarker);


