ymaps.ready(init);
var myMap, myPlacemark;

function init(long,lat){ 
    myMap = new ymaps.Map("map", {
        center: [28.591372500000002, 77.0958637], zoom: 17
    });

    myPlacemark = new ymaps.Placemark([28.591372500000002, 77.0958637], { hintContent: 'Delhi!', balloonContent: 'Capital of India'});
            
    myMap.geoObjects.add(myPlacemark);
}