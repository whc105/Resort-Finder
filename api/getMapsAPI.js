const googleMapsClient = require("@google/maps");

module.exports = app => {
    const client = googleMapsClient.createClient({
        key: "AIzaSyCdouL4ILt_yeXV71VF8brpFy2hMbCQTcg",
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

    //Gets 10 nearby hotels
    //Locality is derived here
    app.get('/api/getNearbyHotels/:location', (req, res) => {
        client.geocode({
            address: req.params.location
        }).asPromise().then((response) => {
            const location = [response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng]
            client.placesNearby({
                location: location,
                keyword: "hotel",
                rankby: "distance",
                type: "establishment"
            }).asPromise()
                .then((hotelResponse) => {
                    const nearbyHotels = hotelResponse.json.results.splice(0, 10).map((hotel) => {
                        const fieldedHotel = {
                            name: hotel.name,
                            rating: hotel.rating,
                            vicinity: hotel.vicinity
                        }
                        return fieldedHotel;
                    });
                    res.send(nearbyHotels);
                }).catch((err) => {
                    res.send(err);
                });
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
    })
}