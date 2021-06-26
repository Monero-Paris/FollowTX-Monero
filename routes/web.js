const express = require('express')
const router = express.Router()

const IndexController = require('../controllers/IndexController')

router.get('/', IndexController.index)


router.get('/login', (request, response) => {
	response.render('login.html')
})

router.get('/dashboard', (request, response) => {
	response.render('dashboard.html')
})

module.exports = router