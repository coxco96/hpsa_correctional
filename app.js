
/* read geojson data */
let promises = ['./hpsa_boundaries.json', './hpsa_prison_only.json']
    .map(file => fetch(file)
    .then(r => r.json()));

Promise.all(promises).then(data => {
    const boundaries = data[0];
    const facilities = data[1];
    const counties = data[2]

    drawMap(boundaries, facilities)
});


function drawMap(boundaries, facilities) {

    const options = {
        center: [41.2610, -97.5096],
        zoom: 4.15,
        zoomSnap: .1
    }
    
    const map = L.map('map', options);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    L.geoJSON(boundaries, {
        style: {
            color: 'pink',
            weight: 1.5,
            opacity: .3,
            fillOpacity: .6
        }
    }).addTo(map);

    L.geoJSON(facilities, {
        style: {
            color: 'darkorange',
            opacity: .9,
            fillOpacity: .8
        }
    })
    .bindTooltip(function (feature) {
        return `${feature.feature.properties.county}, ${feature.feature.properties.state}`;
    })
    .addTo(map);
    

} // end drawMap

  





