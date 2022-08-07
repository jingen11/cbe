const router = module.exports = require("express").Router();

const upload = require('../middlewares/multer_middleware');

router.get('/', function (req, res) {
    const workers = {};

    for (const workerId in Model.Worker.byId)
        workers[workerId] = Model.Worker.byId[workerId].toAux();

    return res.json({
        'success': true,
        'data': workers
    });
});

router.post('/', upload.single('icImage'), function (req, res) {
    (async function () {
        try {
            const worker = await Model.Worker.newWorker(
                {
                    name: req.body.name,
                    icNo: req.body.icNo,
                    icImage: req.file,
                    wage: req.body.wage,
                    phoneNumber: req.body.phoneNumber,
                    dateJoined: new Date(req.body.dateJoined),
                    vehicleId: req.body.vehicle
                });

            return res.json(
                {
                    'success': true,
                    'data': worker.toAux()
                });
        } catch (error) {
            return res.json({ error: error.message });
        }
    })();
});

router.patch('/:workerId', upload.single('icImage'), function (req, res) {
    (async function () {
        try {
            const worker = Model.Worker.byId[req.params.workerId];

            await worker.update({
                name: req.body.name,
                icNo: req.body.icNo,
                icImage: req.file,
                wage: req.body.wage,
                phoneNumber: req.body.phoneNumber,
                dateJoined: new Date(req.body.dateJoined),
                vehicleId: req.body.vehicle
            })

            return res.json(
                {
                    'success': true,
                    'data': worker.toAux()
                });
        } catch (error) {
            console.log(error);
            return res.json({ error: error.message });
        }
    })();
});

router.delete('/:workerId', function (req, res) {
    (async function () {
        try {
            await Model.Worker.delete(Model.Worker.byId[req.params.workerId]);

            return res.json(
                {
                    'success': true
                });
        } catch (error) {
            return res.json({ error: error.message });
        }
    })();
});
