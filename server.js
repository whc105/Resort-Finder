const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
var port = process.env.PORT || 8080;
app.set('port', port);

const getResortsAPI = require('./api/getResorts');
const getLocationsAPI = require('./api/getLocations');
const getMapsAPI = require('./api/getMapsAPI');
const getSkiMapAPI = require('./api/getSkiMap');
const getYelpFusionAPI = require('./api/getYelpFusionAPI');

getResortsAPI(app);
getLocationsAPI(app);
getMapsAPI(app);
getSkiMapAPI(app);
getYelpFusionAPI(app);

require('./db');

app.use(express.static(path.join(__dirname, 'dist/ski-resort-finder')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ski-resort-finder/index.html'));
});

app.listen(port, () => {
    console.log('App listening on port ' + port +'!')
});