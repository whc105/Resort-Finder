const mongoose = require('mongoose');

require('../db');
const ResortMap = mongoose.model('ResortMap');

module.exports = app => {
    app.get('/api/getResortWebsite/:name', (req, res) => {
        ResortMap.find({ "SkiArea.name": req.params.name }, (err, resort) => {
            if (err) {
                res.send(err);
            } else {
                if (resort.length === 0) {
                    res.send({});
                } else {
                    const returnData = {
                        id: resort[0].SkiArea.id,
                        official_website: resort[0].SkiArea.official_website
                    }
                    res.send(returnData);
                }

            }
        })
    });
}