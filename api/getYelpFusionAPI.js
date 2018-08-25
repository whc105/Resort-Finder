const yelpAccessToken = require("../devKeys.js").yelpAccessToken;
const axios = require('axios');

module.exports = app => {
    //Gets 10 nearby restaurants
    app.get('/api/yelp/getNearbyRestaurants/:location', (req, res) => {
        axios.get(`https://api.yelp.com/v3/businesses/search?location=${req.params.location}`,
        { headers: { Authorization: `Bearer ${yelpAccessToken}` } })
        .then((results) => {
            res.send(results.data.businesses.splice(0, 10));
        }).catch((err) => {
            res.send(err);
        })
    })
}