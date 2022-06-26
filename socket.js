const { Server } = require( "socket.io" );

const socketIo = module.exports = function( server )
{
    const io = new Server( server );

    io.use( ( socket, next ) => 
    {
        // const sessionId = socket.handshake.auth.sessionId;
        // socket.sessionId = sessionId;
        // next();
    });

    io.on( "connection", ( socket ) => 
    {
        consumeAction( socket );

        socket.on("disconnect", ( reason ) => 
        {
            console.log( reason );
        });
    });

  return io;
};

const consumeAction = function( socket )
{
    socket.on( "get_users", getUsers );
    // socket.on( "change_password", changePassword );
    // socket.on( "new_worker", newWorker );
    // socket.on( "update_worker", updateWorker );
}

const getUsers = function( data )
{

};

