var basemap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

});
var routs = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/lfroutes/ows?',{
    layers: 'lfroutes:lfroutes',
    format: 'image/png',
    transparent: true
});

var map = new L.Map('map', {
    layers: [basemap, routs]
}).setView([52.371807, 4.86393985], 17);


$.getJSON('DATA/breweries.json', function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var feat = data[i].postaddress;
        if (feat && feat.latitude && feat.longitude )  {
            marker = new L.marker([feat.latitude,feat.longitude]).addTo(map);
            console.log(feat.latitude);
            console.log(feat.longitude);
        }
    }
});


var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(52.371807, 4.86393985),
		L.latLng(52.5206, 13.37594)
	],
	geocoder: L.Control.Geocoder.nominatim(),
	routeWhileDragging: true,
	reverseWaypoints: true,
	showAlternatives: true,
	altLineOptions: {
		styles: [
			{color: 'black', opacity: 0.15, weight: 9},
			{color: 'white', opacity: 0.8, weight: 6},
			{color: 'blue', opacity: 0.5, weight: 2}
		]
	}
})).addTo(map);

L.Routing.errorControl(control).addTo(map);