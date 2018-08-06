const googleMapsClient  = require("@google/maps");

module.exports = app => {
    const client = googleMapsClient.createClient({
        key: "AIzaSyCdouL4ILt_yeXV71VF8brpFy2hMbCQTcg",
        Promise: Promise
    });
    app.get('/api/getDistance/:location', (req, res) => {
        client.distanceMatrix({
            origins: "New York City",
            destinations: req.params.location,
            mode: "driving",
            units: "imperial"
        }).asPromise()
        .then((response) => {
            res.send(response.json.rows);
        });
    });

    //Gets the 5 closest nearby restaurants
    app.get('/api/getNearbyRestaurants/:location', (req, res) => {
        client.places({
            query: req.params.location,
            radius: 13000, //Approx 8 mile radius
            type: "restaurant"
        }).asPromise()
        .then((response) => {
            const nearbyRestaurants = response.json.results.splice(0, 5);
            res.send(nearbyRestaurants);
        })
    })
}