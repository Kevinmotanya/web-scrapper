// Node Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Set up a listening port 
var PORT = process.env.PORT || 3000;

// Setting up Express App
var app = express();

// Requiring routes
var routes = require("./routes");

// Designating the public folder as a static dir
app.use(express.static("public"));

// Connecting Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Use bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// routing all requests through the middleware
app.use(routes);

// Use the deployed database or local
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://<dbuser>:<dbpassword>@ds131905.mlab.com:31905/heroku_khvlzc9h";

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// Listen on the port
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});