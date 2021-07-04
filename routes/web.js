const express = require('express')
const router = express.Router()

const GatewayController = require('../controllers/GatewayController')

router.get('/', GatewayController.index)

module.exports = router