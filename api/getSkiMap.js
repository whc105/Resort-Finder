const mongoose = require('mongoose');
const axios = require('axios');
const parseString = require('xml2js').parseString;

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

    //Gets the first resort trail map
    app.get('/api/getResortTrailMap/:ID', (req, res) => {
        axios.get(`https://skimap.org/SkiAreas/view/${req.params.ID}.json`)
        .then((resortIDData) => {
            if (resortIDData.data.ski_maps && resortIDData.data.ski_maps[0]) {
                const mapID = resortIDData.data.ski_maps[0].id;
                axios.get(`https://skimap.org/SkiMaps/view/${mapID}.xml`)
                .then((mapXML) => {
                    parseString(mapXML.data, function (err, result) {
                        res.send(result.skiMap.render);
                    });
                })
            }
        })
    })
}