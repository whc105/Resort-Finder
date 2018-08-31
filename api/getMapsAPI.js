const googleMapsClient = require("@google/maps");
const googleAPIKey = require('../.devKeys').googleKey;

module.exports = app => {
    const client = googleMapsClient.createClient({
        key: googleAPIKey,
        Promise: Promise
    });

    app.get('/api/getDistance/:location/:startingLocation', (req, res) => {
        const origin = (req.params.startingLocation !== "undefined") ? req.params.startingLocation : "New York City";
        client.distanceMatrix({
            origins: origin,
            destinations: req.params.location,
            mode: "driving",
            units: "imperial"
        }).asPromise()
            .then((response) => {
                res.send(response.json.rows);
            }).catch((err) => {
                res.send(err);
            });
    });

    //Gets the closest town or city
    app.get('/api/getNearbyCity/:location', (req, res) => {
        client.geocode({
            address: req.params.location
        }).asPromise().then((response) => {
            response.json.results[0].address_components.some((addressComponent) => {
                if (addressComponent.types.includes("locality") === true || addressComponent.types.includes("administrative_area_level_3") === true) {
                    locality = addressComponent;
                    return true;
                }
            });
            res.send(locality);
        }).catch((err) => {
            res.send(err);
        });
    });
}