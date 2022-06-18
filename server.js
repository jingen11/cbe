require('dotenv').config();
const Db = require('./db');
const app = require('./app');
const User = require('./models/user');

Db.i.initialise( app ).then(async ()=>{ 

    const admin = await User.login('Cbe123456', '0125287019' );
    

    await admin.deleteUser(admin);

});

