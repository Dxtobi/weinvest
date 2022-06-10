require("dotenv").config({ path: "./configuration.env" });
require("dotenv").config()
//const sslRedirect = require("heroku-ssl-redirect");
const path = require('path');
const express = require("express");
const nodemailer = require("nodemailer");
const redirect = require("./routes/auth.js");
const privateRouteRedirect = require("./routes/privateRoute.js");
const enforce = require('express-sslify');
const errorResponse = require("./middleware/error.js");

const app = express();

const connectDatabase = require("./config/databaseConfig.js");

// Database connection
connectDatabase();

// middleware that allow us to get the data from the body
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.json());
//app.use(sslRedirect());

app.use("/api/auth", redirect);
app.use("/api/private-route", privateRouteRedirect);
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// Error Handler
app.use(errorResponse);

const PORT = process.env.PORT || 4000;

const serverListeningPort = app.listen(PORT, () => {
  console.log(`Currently server is running at port ${PORT}`);
});

process.on("unhandeledRejection", (err, promise) => {
  console.log(`Error : ${err}`);
  serverListeningPort.close(() => process.exit(1));
});

