const googleMapsClient = require("@google/maps");

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
                })
        })
    });

    //Gets the closest town or city
    app.get('/api/getNearbyCity/:location', (req, res) => {
        client.geocode({
            address: req.params.location
        }).asPromise().then((response) => {
            response.json.results[0].address_components.forEach((addressComponent) => {
                if (addressComponent.types.includes("locality")) {
                    locality = addressComponent;
                }
            });
            res.send(locality);
        });
    })
}