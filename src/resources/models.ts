interface Resort {
    avg_snowfall: number,
    base: number,
    bd_run_pct: number,
    blue_run_pct: number,
    double_bd_run_pct: number,
    double_chair: number,
    eight_pers_lift: number,
    gondolas: number,
    green_run_pct: number,
    high_speed_quad: number,
    high_speed_six: number,
    lift_tickets: number,
    location: string,
    longest_run: number,
    night_skiing: number,
    quad_lift: number,
    region: string,
    resort_name: string,
    season_close: string,
    season_open: string,
    skiable_terrain: number,
    snow_making_area: string,
    summit: number,
    surface_lift: number,
    terrain_parks: number,
    total_lifts: number,
    total_runs: number,
    triple_chair: number,
    vertical_drop: number
}

interface Locality {
    long_name: string,
    short_name: string,
    types: string[]
}

export { Resort, Locality }