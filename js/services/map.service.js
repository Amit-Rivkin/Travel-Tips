

import { apiService } from '../../key.js'
import { locService } from './loc.service.js'
import {appConroller} from '../app.controller.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocByAddress

}

var gMap;
var gMarker;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    // console.log(apiService)
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15

            })

            addLocListener()
            console.log('Map!', gMap);
        })

}

function addLocListener() {
    gMap.addListener("click", (mapsMouseEvent) => {
        var locName = prompt("enter place name") || "Yarons uncle house"
        var latLng = mapsMouseEvent.latLng.toJSON()
        locService.addLoc(appConroller.onAddLoc, latLng, locName);
        if(gMarker) gMarker.setMap(null)
        var markerLatLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        gMarker = new google.maps.Marker({
            position: markerLatLng,
        });
        gMarker.setMap(gMap)
    })
}

function addMarker(loc, name) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: name
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_GOOGLE_KEY = apiService.getKey() //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_GOOGLE_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getLocByAddress(address){
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiService.getKey()}`
    return axios.get(url).then((res)=>res.data.results)
}