const router = module.exports = require( "express" ).Router();

const User = require('../models/user' );

router.post( "/login", ( req, res ) => 
{
    (async () => 
    {
        try 
        {
            const user = await User.login( req.body.username, req.body.password );

            Session.activate( req.sessionID, user );

            res.json( { user: user.toAux() } );
        } 
        catch( error ) 
        {
            console.log( error );
            
            res.json( { error: error.message } );
        }
    })();
});

router.post( "/register", ( req, res ) => 
{
    (async () => 
    {
        try 
        {
            const user = await User.signUp( req.body.username, req.body.password, req.body.confirmPassword );

            Session.activate( req.sessionID, user );

            res.json( { user: user.toAux() } );
        } 
        catch( error )
        {
            console.log( error );

            res.json( { error: error.message } );
        }
    })();
});

router.get("/logout", ( req, res ) => 
{
    req.session.destroy();

    Session.deactivate( req.sessionID );

    res.json( { success: true } );

    //res.redirect("/");
});