// importing basic libraries
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); //http request logger

// Reading files first lone
const fs = require("fs");
const readFileLines = (filename) => fs.readFileSync(filename).toString("UTF8").split("\n");

// Routing
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

var app = express();

// Setting up database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
let url = readFileLines("../restricted/mongodb_guipinheiro.txt")[0];
const mongoDB = url;
// const mongoDB = "mongodb://127.0.0.1:27017/"

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// setting up middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add route-handling code to request
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

