const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const PORT = 8080

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gateway', {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
}).then(() => console.log('mongodb connected successfully'))

//const monerojs = require("monero-javascript")

nunjucks.configure('views', {
	autoescape:  true,
	express:  app,
	watch: true,
}) 

// sockets
require('./sockets/index')(io)

app.use(bodyParser.json())
app.use(express.static('public'))

const web_router = require('./routes/web')
const api_router = require('./routes/api')

app.use('/', web_router)
app.use('/api', api_router)

http.listen(PORT, () => console.log('listening on localhost:' + PORT))