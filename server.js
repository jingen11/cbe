require( 'dotenv' ).config();
require( './db' );
const fs = require( 'fs' );

const app = require( './app' );
const Worker = require( './models/worker' );
const Vehicle = require( './models/vehicle' );

(async ()=>
{
    try
    {
        fs.accessSync( './images' );   
    }
    catch( error )
    {
        if( error.code === "ENOENT" )
        {
            fs.mkdirSync( './images', { recursive: true } );
            
            try 
            {
                fs.accessSync( './images/workers' );
            }
            catch( error )
            {
                if( error.code === "ENOENT" )
                    fs.mkdirSync( './images/workers', { recursive: true } );
            }

            try 
            {
                fs.accessSync( './images/vehicles' );
            }
            catch( error )
            {
                if( error.code === "ENOENT" )
                    fs.mkdirSync( './images/vehicles', { recursive: true } );
            }
        }
    }

    await Database.i.initialise( app );
    await Vehicle.initialise();
    await Worker.initialise();
})();

