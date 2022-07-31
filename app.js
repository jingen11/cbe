
const { createServer } = require("http");

const express = require("express");
const app = module.exports = express();

const bodyParser = require("body-parser");
const session = require("express-session");

const socketIo = require('./socket');
const httpServer = createServer(app);
socketIo(httpServer);

const authRoute = require('./routes/auth_route');
const workerRoute = require('./routes/worker_route');
const vehicleRoute = require('./routes/vehicle_route');

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

app.use("/api/auth", authRoute);
app.use("/api/workers", workerRoute);
app.use("/api/vehicles", vehicleRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
});

app.on('ready', function () {
    httpServer.listen(4000, () => {
        return console.log("app listening on port 4000");
    });
});
