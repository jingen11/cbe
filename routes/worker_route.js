const router = module.exports = require( "express" ).Router();

const upload = require( '../middlewares/multer_middleware' );

router.post('/api/workers_new', upload.single( 'icImage' ), function( req, res )
{
    (async function()
    {
        const worker = await Worker.newWorker(
        {
            name: req.body.name,
            icNo: req.body.icNo,
            icImage: req.file
        });
        
        res.json(
        {
            'success': true,
            'result': worker.toAux(),
        });
    })();
});