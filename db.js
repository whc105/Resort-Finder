const mongoose = require('mongoose');
const mongoURI = require('./config').KEYS;

console.log(mongoURI)

const Schema = mongoose.Schema;

const ResortSchema = new Schema({
    avg_snowfall: Number,
    base: Number,
    bd_run_pct: Number,
    blue_run_pct: Number,
    double_bd_run_pct: Number,
    double_chair: Number,
    eight_pers_lift: Number,
    gondolas: Number,
    green_run_pct: Number,
    high_speed_quad: Number,
    high_speed_six: Number,
    lift_tickets: Number,
    location: String,
    longest_run: Number,
    night_skiing: Number,
    quad_lift: Number,
    region: String,
    resort_name: String,
    review_score: Number,
    season_close: String,
    season_open: String,
    skiable_terrain: Number,
    snow_making_area: Number,
    summit: Number,
    surface_lift: Number,
    terrain_parks: Number,
    total_lifts: Number,
    total_runs: Number,
    triple_chair: Number,
    vertical_drop: Number
});

mongoose.model("Resort", ResortSchema);

const ResortMapSchema = new Schema({
    SkiArea: Object,
    Region: Array
})

mongoose.model("ResortMap", ResortMapSchema);

mongoose.connect(mongoURI, { useNewUrlParser: true });