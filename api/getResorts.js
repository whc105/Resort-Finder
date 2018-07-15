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
}