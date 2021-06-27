const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const redis = require('redis')

const session = require('express-session')
const flash = require('express-flash')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gateway', {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
}).then(() => console.log('mongodb connected successfully'))


const redis_client = redis.createClient()
redis_client.on('error', (error) => console.log(error))

//const monerojs = require("monero-javascript")

const PORT = 8080

nunjucks.configure('views', {
	autoescape:  true,
	express:  app,
	watch: true,
}) 

const subscriber = redis.createClient()
//const publisher = redis.createClient()

subscriber.subscribe('tx')
const SubscriberHandler = require('./subscribe/index')
subscriber.on('message',(channel, message) => {
	
    console.log('new payment here')

    console.log(channel, message)

	SubscriberHandler.tx(message, io)
})

// sockets
require('./sockets/index')(io)

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))
app.use(flash())

const web_router = require('./routes/web')
const api_router = require('./routes/api')

app.use('/', web_router)
app.use('/api', api_router)

http.listen(PORT, () => {
	console.log('listening on *:' + PORT)
})