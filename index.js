'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'jsdmomowonimiow') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

var token = "EAAHGdCAeol8BAFRLk1gQPSLzLnrhEaPQsTL3UMctKBaGwWJMKQcDUnHF1IJZCaZCu5J2xtHS57PksmsTgogjjWNQriU5bz3qcymheaCQcSqnRJZAZADfzX1l0KQhrpdb2gxJ7Lqzlb2IPvi18x8ZAw9egtlwZA7vVJ6A8UtK83MIYcJ33vHzhH"

//EAAHGdCAeol8BAFRLk1gQPSLzLnrhEaPQsTL3UMctKBaGwWJMKQcDUnHF1IJZCaZCu5J2xtHS57PksmsTgogjjWNQriU5bz3qcymheaCQcSqnRJZAZADfzX1l0KQhrpdb2gxJ7Lqzlb2IPvi18x8ZAw9egtlwZA7vVJ6A8UtK83MIYcJ33vHzhH