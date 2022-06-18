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
    secret: "jingen11",
    name: "chat-app",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.listen(4000, () => {
  return console.log("app listening on port 4000");
});
