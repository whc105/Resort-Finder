const mongoose = require('mongoose');

require('../db');
const Resort = mongoose.model('Resort');

module.exports = app => {
    app.get('/api/getAllResorts', (req, res) => {
        Resort.find({}, (err, allResorts) => {
            if (err) {
                res.send(err);
            } else {
                res.send(allResorts);
            }
        });
    });

    app.get('/api/getResort/:name', (req, res) => {
        Resort.findOne({ resort_name: req.params.name }, (err, resort) => {
            if (err) {
                res.send(err);
            } else {
                res.send(resort);
            }
        })
    });

    app.get('/api/getResorts/:region', (req, res) => {
        Resort.find({ region: req.params.region }, (err, resorts) => {
            if (err) {
                res.send(err);
            } else {
                res.send(resorts);
            }
        })
    })
}