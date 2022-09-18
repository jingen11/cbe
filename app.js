
const express = require("express");
const app = module.exports = express();

const bodyParser = require("body-parser");
const session = require("express-session");

const authRoute = require('./routes/auth_route');
const workerRoute = require('./routes/worker_route');
const vehicleRoute = require('./routes/vehicle_route');
const attendanceRoute = require('./routes/attendance_route');

app.use(
    bodyParser.urlencoded({ extended: true })
);
app.use(bodyParser.json());

app.use(
    session({
        secret: "cbe@qwoqpncpecwwe390420492304",
        name: "cbe",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(express.static(__dirname + '/images'));

app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build' + 'index.html');
});

app.use("/api/auth", authRoute);
app.use("/api/workers", workerRoute);
app.use("/api/vehicles", vehicleRoute);
app.use("/api/attendances", attendanceRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
});

app.on('ready', function () {
    app.listen(process.env.port, () => {
        return console.log(`app listening on port ${process.env.port}`);
    });
});
