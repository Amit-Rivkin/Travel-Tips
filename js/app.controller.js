import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
export const appConroller = {
    onAddLoc
}

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGo = onGoLoc;
window.onDelete = onDeleteLoc;
window.onSearch = onSearch;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            renderLocations()
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


function renderLocations() {
    var elLocations = document.querySelector(".locs")
    var strHTML = ``

    locService.getLocs().then((locs) => {
        console.log(locs)
        strHTML = locs.map((loc) => {
            return `<div>name: ${loc.name}, lat:${loc.lat}, lng:${loc.lng} <button class="go" onclick="onGo(${loc.lat}, ${loc.lng})">Go</button>
            <button class="delete" onclick="onDelete(${loc.id})">Delete</button>
            </div>`
        })
        elLocations.innerHTML = strHTML.join('')
    })
}

function onGoLoc(lat, lng) {
    mapService.panTo(lat, lng)
}
function onDeleteLoc(id) {
    locService.deleteLoc(id)
    renderLocations()
}

function onAddLoc() {
    renderLocations()
}

function onSearch() {
    let searchParam = document.querySelector('.search-input').value
    var elLocationH1 = document.querySelector('.location-param')
    mapService.getLocByAddress(searchParam).then((res)=>{
        if(!res) return
        console.log(res[0])
        elLocationH1.innerHTML += res[0].formatted_address
        mapService.panTo(res[0].geometry.location.lat, res[0].geometry.location.lng)
    })
    
}