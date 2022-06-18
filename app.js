const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: "cbe@qwoqpncpecwwe390420492304",
    name: "cbe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.on( 'ready', function(){  
  app.listen(4000, () => {
    return console.log("app listening on port 4000");
  });
});

module.exports = app;
