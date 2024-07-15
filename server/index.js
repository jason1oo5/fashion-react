#!/usr/bin/env node
const express = require("express");
const app = express();
require("dotenv").config();

const severPort = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const upload = require("express-fileupload");
const session = require("express-session");

const host = process.env.DBHOST;
const database = process.env.DBNAME;
const user = process.env.DBUSER;
const port = process.env.DBPORT;
const password = process.env.DBPASS;

const mongoose = require("mongoose");
const { urlencoded } = require("express");

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", (error) =>
  console.log("connection db error", error)
);
mongoose.Promise = global.Promise;

if ((process.env.DOMAIN = -"macbook.local")) {
  mongoose.set("debug", true);
}

console.log("mongodb URL", mongoUrl);

const options = {
  host,
  port,
  user,
  password,
  database,
};

var MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: mongoUrl,
  collection: "sessions",
});
const oneDay = 1000 * 60 * 60 * 24;
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    proxy: true,
    resave: true,
    store,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: oneDay },
  })
);

app.disable("x-powered-by");

function verifyRequest(req, res, buf, encoding) {
  console.log("I AM VERIFYING");
  req.rawBody = buf.toString(encoding);
}

app.use(upload());

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(
  express.json({
    limit: "32mb",
    verify: verifyRequest,
  })
);

app.use(cookieParser());

app.use(
  urlencoded({
    extended: true,
    verify: verifyRequest,
  })
);

app.use(cors({ origin: true, credentials: true }));

var compression = require("compression");
const { getSignedUrl } = require("./controllers/s3Controller");

app.use(compression());

app.use("/", require("./routes/routes"));

app.listen(severPort, () => {
  console.log(`sever is listenning on ${severPort}`);
  const link = getSignedUrl();
});
