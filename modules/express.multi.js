require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

if (process.env.DEBUGMODE === "true") {
	app.use(morgan('dev')); // log every request to the console
}

app.use(express.static('public/static'));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.EXPRESS_SSL === "true") {
	const https = require('https');
	const http = require('http');
	const options = {
		key: fs.readFileSync("modules/express/certs/" + process.env.EXPRESS_SSL_KEY_FILE),
		cert: fs.readFileSync("modules/express/certs/" + process.env.EXPRESS_SSL_PEM_FILE)
	};

	http.createServer(app).listen(80);
	https.createServer(options, app).listen(443);
	console.log("Web Server Started. Port: 80 - 443");
} else {
	const port = process.env.EXPRESS_PORT;
	app.listen(port);
	console.log("Web Server Started. Port: " + port);
}

module.exports = app;