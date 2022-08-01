const router = module.exports = require("express").Router();

const Worker = require('../models/worker');
const upload = require('../middlewares/multer_middleware');

router.get('/', function (req, res) {
    const workers = {};

    for (const workerId in Worker.byId)
        workers[workerId] = Worker.byId[workerId].toAux();

    return res.json({
        'success': true,
        'data': workers
    });
});

router.post('/', upload.single('icImage'), function (req, res) {
    (async function () {
        try {
            const worker = await Worker.newWorker(
                {
                    name: req.body.name,
                    icNo: req.body.icNo,
                    icImage: req.file,
                    wage: req.body.wage,
                    phoneNumber: req.body.phoneNumber,
                    dateJoined: new Date(req.body.dateJoined),
                    vehicle: req.body.vehicle,
                });

            return res.json(
                {
                    'success': true,
                    'data': worker.toAux(),
                });
        } catch (error) {
            return res.json({ error: error.message });
        }

    })();
});

router.post('/:workerId', upload.single('icImage'), function( req, res ){

});
