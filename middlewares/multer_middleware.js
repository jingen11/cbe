const multer = require( "multer" );

const storage = multer.memoryStorage();

const upload = multer( 
{ 
    storage: storage,
    fileFilter: function( req, file, cb )
    {
        const mimeType = file.mimetype;

        const results = mimeType.split( '/' );

        if( results[0] !== 'image' )
            cb( new Error( 'Invalid file type' ) );

        if( results[1] !== 'jpeg' && results[1] !== 'jpg' && results[1] !== 'png' )
            cb( new Error( 'image with png or jpg or jpeg extension only can be accepted' ) );
        
        cb( null, true );
    } 
});

module.exports = upload;