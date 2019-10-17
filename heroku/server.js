const express = require('express')
const app = express()
const _ = require('underscore')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 9001

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Check to see if we have the settings we need.
var settings = [ 'TAKESHAPE_PROJECTID', 'TAKESHAPE_KEY', 'ALGOLIA_APPID', 'ALGOLIA_ADMIN_KEY' ]
var hasSettings = true;
_.each(settings, setting => {
	if (!process.env[setting]) {
		console.log('Missing Settings', setting);
		hasSettings = false;
	}
})

// If we have a missing value, then stop the server.
if (!hasSettings) return process.exit(22);

// Setup the routes.
app.post('/webhook', require('./routes/webhook'))
app.get('/rebuild', require('./routes/rebuild'))

app.listen(PORT);

console.log('Starting FarmsNearMe')
console.log(`Listening on port ${PORT}...`);
