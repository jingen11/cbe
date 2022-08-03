require('dotenv').config();
require('./db');
require('./models/model');
require('./session');

const fs = require('fs');

const app = require('./app');

(async () => {
    try {
        fs.accessSync('./images');

        try {
            fs.accessSync('./images/workers');
        }
        catch (error) {
            if (error.code === "ENOENT")
                fs.mkdirSync('./images/workers', { recursive: true });
        }

        try {
            fs.accessSync('./images/vehicles');
        }
        catch (error) {
            if (error.code === "ENOENT")
                fs.mkdirSync('./images/vehicles', { recursive: true });
        }
    }
    catch (error) {
        if (error.code === "ENOENT") {
            fs.mkdirSync('./images', { recursive: true });

            try {
                fs.accessSync('./images/workers');
            }
            catch (error) {
                if (error.code === "ENOENT")
                    fs.mkdirSync('./images/workers', { recursive: true });
            }

            try {
                fs.accessSync('./images/vehicles');
            }
            catch (error) {
                if (error.code === "ENOENT")
                    fs.mkdirSync('./images/vehicles', { recursive: true });
            }
        }
    }

    await Database.i.initialise(app);
    await Model.Vehicle.initialise();
    await Model.Worker.initialise();
    setInterval(() => {
        console.log(Session.byId);
        console.log(Model.Worker.byId);
    }, 5000);
})();

