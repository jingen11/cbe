const router = module.exports = require( "express" ).Router();

router.get('/', function (req, res) {
    const vehicles = {};

    for (const vehicleId in Model.Vehicle.byId)
        vehicles[vehicleId] = Model.Vehicle.byId[vehicleId].toAux();

    return res.json({
        'success': true,
        'data': vehicles
    });
});

router.post('/', function (req, res) {
    (async function () {
        try {
            const vehicle = await Model.Vehicle.newVehicle(
                {                
                    registrationNum: req.body.registrationNum,
                    roadTaxExpDate: req.body.roadTaxExpDate,
                    puspakomExpDate: req.body.puspakomExpDate,
                    petrolCardNum: req.body.petrolCardNum,
                    touchNGoCardNum: req.body.touchNGoCardNum
                });

            return res.json(
                {
                    'success': true,
                    'data': vehicle.toAux()
                });
        } catch (error) {
            return res.json({ error: error.message });
        }
    })();
});

router.patch('/:vehicleId', function( req, res ){
    (async function () {
        try {
            const vehicle = Model.Vehicle.byId[req.params.vehicleId];

            await vehicle.update({
                registrationNum: req.body.registrationNum,
                roadTaxExpDate: req.body.roadTaxExpDate,
                puspakomExpDate: req.body.puspakomExpDate,
                petrolCardNum: req.body.petrolCardNum,
                touchNGoCardNum: req.body.touchNGoCardNum
            })

            return res.json(
                {
                    'success': true,
                    'data': vehicle.toAux()
                });
        } catch (error) {
            return res.json({ error: error.message });
        }
    })();
});

router.delete('/:vehicleId', function( req, res ){
    (async function(){
        try {
            const vehicle = Model.Vehicle.byId[req.params.vehicleId];

            await vehicle.delete();

            return res.json(
                {
                    'success': true,
                    'data': vehicle.toAux()
                });
        } catch (error) {
            return res.json({ error: error.message });
        }
    })();
});
