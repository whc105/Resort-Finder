const googleMapsClient  = require("@google/maps");

module.exports = app => {
    app.get('/api/getDistance/:location', (req, res) => {
        const client = googleMapsClient.createClient({
            key: "AIzaSyCdouL4ILt_yeXV71VF8brpFy2hMbCQTcg",
            Promise: Promise
        });
        client.distanceMatrix({
            origins: "New York City",
            destinations: req.params.location,
            mode: "driving",
            units: "imperial"
        }).asPromise()
        .then((response) => {
            res.send(response.json);
        });
    })
}