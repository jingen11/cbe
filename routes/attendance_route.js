const router = module.exports = require("express").Router();

router.get('/', function (req, res) {
  let rawAttendances = [];
  let convertedAttendances = [];

  (async function () {
    try {
      rawAttendances = await Model.Attendance.getAttendance(new Date(req.query.from), new Date(req.query.to), req.query.workerIds);

      for (const attendance of rawAttendances)
        convertedAttendances.push(attendance.toAux());

      return res.json({
        'success': true,
        'data': convertedAttendances
      });
    } catch (error) {
      return res.json({ error: error.message });
    }

  })();


});

router.post('/', function (req, res) {
  (async function () {
    try {
      //{workerId: {vehicleId: , date: }}
      const attendances = {};
      let attendance;

      for (const workerId in req.body.workers) {
        if (req.body.workers[workerId].present) {
          attendance = await Model.Worker.byId[workerId].attend(new Date(req.body.workers[workerId].date), req.body.workers[workerId].vehicleId);
          attendances[workerId] = attendance;
        }

        else
          await Model.Worker.byId[workerId].absent(new Date(req.body.workers[workerId].date));
      }

      for (const [workerId, attendance] of Object.entries(attendances)) {

        attendances[workerId] = attendance.toAux();
      }

      return res.json(
        {
          'success': true,
          'data': attendances
        });
    } catch (error) {
      return res.json({ error: error.message });
    }
  })();
});

// router.patch('/:workerId', upload.single('icImage'), function (req, res) {
//   (async function () {
//     try {
//       const worker = Model.Worker.byId[req.params.workerId];

//       await worker.update({
//         name: req.body.name,
//         icNo: req.body.icNo,
//         icImage: req.file,
//         wage: req.body.wage,
//         phoneNumber: req.body.phoneNumber,
//         dateJoined: new Date(req.body.dateJoined),
//         vehicleId: req.body.vehicle
//       })

//       return res.json(
//         {
//           'success': true,
//           'data': worker.toAux()
//         });
//     } catch (error) {
//       console.log(error);
//       return res.json({ error: error.message });
//     }
//   })();
// });

// router.delete('/:workerId', function (req, res) {
//   (async function () {
//     try {
//       await Model.Worker.delete(Model.Worker.byId[req.params.workerId]);

//       return res.json(
//         {
//           'success': true
//         });
//     } catch (error) {
//       return res.json({ error: error.message });
//     }
//   })();
// });
