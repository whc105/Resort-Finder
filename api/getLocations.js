const mongoose = require('mongoose');

require('../db');
const Resort = mongoose.model('Resort');

module.exports = app => {
    app.get('/api/getAllLocations', (req, res) => {
        Resort.find({}, {_id: 0, location: 1 , region: 1}, (err, allLocations) => {
            if (err) {
                res.send(err);
            } else {
                let locations = [];
                allLocations.forEach((elem) => {
                    if (!locations.includes(JSON.stringify(elem))) {
                        locations.push(JSON.stringify(elem));
                    }
                });
                locations = locations.map((loc) => {
                    return JSON.parse(loc);
                });

                let areas = [
                    {
                        region: "Canada",
                        locations: [],
                    },
                    {
                        region: "Europe",
                        locations: [],
                    },
                    {
                        region: "Midwest",
                        locations: [],
                    },
                    {
                        region: "Northeast",
                        locations: [],
                    },
                    {
                        region: "Rocky Mountains",
                        locations: [],
                    },
                    {
                        region: "West Coast",
                        locations: [],
                    },
                    {
                        region: "Southern Hemisphere",
                        locations: [],
                    }
                ]
                areas = areas.map((area) => {
                    locations.forEach((loc) => {
                        if (area.region === loc.region) {
                            area.locations.push(loc.location);
                        }
                    });
                    return area;
                });

                res.send(areas);
            }
        });
    });
}