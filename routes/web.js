const express = require('express')
const router = express.Router()

const Meta = require('../models/Meta')

require('dotenv').config()

const GatewayController = require('../controllers/GatewayController')

router.get('/', GatewayController.index)

router.get('/setup',  async (request, response) => {

	const setup_done = await Meta.findOne({ key: 'setup_done' })
	if ( setup_done ) {
		return response.render('setup_error.html')
	}

	response.render('setup.html')
})

router.get('/login', (request, response) => {
	response.render('login.html')
})

router.get('/dashboard', (request, response) => {
	response.render('dashboard.html')
})

module.exports = router