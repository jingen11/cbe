require( 'dotenv' ).config();
require( './db' );
const app = require( './app' );
const Worker = require( './models/worker' );
const Vehicle = require( './models/vehicle' );

(async ()=>
{
    await Database.i.initialise( app );
    await Vehicle.initialise();
    await Worker.initialise();
})();

