const mongoose = require('mongoose');
const axios = require('axios');
const parseString = require('xml2js').parseString;

require('../db');
const ResortMap = mongoose.model('ResortMap');

module.exports = app => {
    app.get('/api/getResortWebsite/:name', (req, res) => {
        //Case insensitive database search
        ResortMap.find({ "SkiArea.name": { $regex: `.*${req.params.name}.*` } }, (err, resort) => {
            if (err) {
                res.send(err);
            } else if (resort.length === 0) {
                res.send({});
            } else {
                const returnData = {
                    id: resort[0].SkiArea.id,
                    official_website: resort[0].SkiArea.official_website
                }
                res.send(returnData);
            }
        });
    });

    //Gets the first resort trail map
    app.get('/api/getResortTrailMap/:ID', (req, res) => {
        axios.get(`https://skimap.org/SkiAreas/view/${req.params.ID}.json`)
            .then(({ data }) => {
                if (data.ski_maps && data.ski_maps[0]) {
                    const mapID = data.ski_maps[0].id;
                    axios.get(`https://skimap.org/SkiMaps/view/${mapID}.xml`)
                        .then((mapXML) => {
                            parseString(mapXML.data, (err, result) => {
                                if (result.skiMap.render) {
                                    res.send(result.skiMap.render);
                                } else {
                                    res.send(result.skiMap.unprocessed);
                                }
                            });
                        })
                }
            });
    });

    //Given a location's regions, get all resort's geo location
    app.post('/api/regions/getResortGeoLocation', (req, res) => {
        const locations = req.body.reduce((acc, current) => {
            acc = acc.concat(current.locations);
            return acc;
        }, []);

        ResortMap.find({ "Region.name": { $in: locations } }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    });

    //Given a list of resorts, get all resort's geo location
    app.post('/api/resorts/getResortGeoLocation', (req, res) => {

        const resortNames = req.body.map((resort) => {
            return resort.resort_name;
        })

        ResortMap.find({}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                data = data.filter((elem) => {
                    let isContain = false;
                    resortNames.forEach((resortName) => {
                        if (resortName.includes(elem.SkiArea.name) || elem.SkiArea.name.includes(resortName)) {
                            isContain = true;
                            return isContain
                        }
                    })
                    return isContain
                });
                res.send(data);
            }
        });
    });
}