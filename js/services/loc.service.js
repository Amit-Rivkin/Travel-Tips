export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}

var gId = 0


import { storageService } from './storage.service.js'

const locs = loadLocs() || [
    {
        name: "Greatplace",
        lat: 32.047104,
        lng: 34.832384,
        id: gId++,
        weather: 10,
        createdAt: 10,
        updatedAt: 20,
    },
    {
        name: "Neveragain",
        lat: 32.047201,
        lng: 34.832581,
        id: gId++,
        weather: 10,
        createdAt: 10,
        updatedAt: 20,
    },
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function saveLocs() {
    storageService.saveToStorage(locs)
}

function loadLocs() {
    return storageService.loadFromStorage()
}
function createLoc(lat, lng) {
    return {
        name: "custom",
        lat,
        lng,
        id: gId++,
        weather: 10,
        createdAt: 10,
        updatedAt: 20,
    }
}
function addLoc(fn, { lat, lng }) {
    locs.push(createLoc(lat, lng))
    saveLocs()
    fn()
    console.log("addLocation", locs)
}

function deleteLoc(id) {
    let currLoc = locs.findIndex(loc => loc.id === id)
    locs.splice(currLoc, 1)

}