const yelpAccessToken = require("../.devKeys.js").yelpAccessToken;
const axios = require('axios');

module.exports = app => {
    //Gets at most 10 nearby restaurants
    app.get('/api/yelp/getNearbyRestaurants/:location', (req, res) => {
        axios.get(`https://api.yelp.com/v3/businesses/search?location=${req.params.location}&categories=restaurants`,
            { headers: { Authorization: `Bearer ${yelpAccessToken}` } })
            .then((results) => {
                res.send(results.data.businesses.splice(0, 10));
            }).catch((err) => {
                res.send(err);
            });
    });

    //Gets at most 10 nearby Hotels
    app.get('/api/yelp/getNearbyHotels/:location', (req, res) => {
        axios.get(`https://api.yelp.com/v3/businesses/search?location=${req.params.location}&categories=hotels,bedbreakfast`,
            { headers: { Authorization: `Bearer ${yelpAccessToken}` } })
            .then((results) => {
                res.send(results.data.businesses.splice(0, 10));
            }).catch((err) => {
                res.send(err);
            });
    });

    //Gets at most 10 nearby ski shops
    app.get('/api/yelp/getNearbySkiShops/:location', (req, res) => {
        axios.get(`https://api.yelp.com/v3/businesses/search?location=${req.params.location}&categories=skishops`,
            { headers: { Authorization: `Bearer ${yelpAccessToken}` } })
            .then((results) => {
                res.send(results.data.businesses.splice(0, 10));
            }).catch((err) => {
                res.send(err);
            });
    });
}