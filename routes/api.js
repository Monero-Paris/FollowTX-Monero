const express = require('express')
const router = express.Router()

// Load middlewares
const verifyToken = require('../middleware/verifyToken')
const jwtVerify = require('../middleware/jwtVerify')

// Load controllers
const RPC_Controller = require('../controllers/API/RPC_Controller')

const InvoicesController = require('../controllers/API/InvoicesController')
const LoginController = require('../controllers/API/LoginController')

router.post('/login', LoginController.login)

router.post('/rpc', RPC_Controller.fetch)

router.get('/invoices', verifyToken, jwtVerify, InvoicesController.index)
router.post('/invoices', verifyToken, jwtVerify, InvoicesController.store)
router.get('/invoices/:id', verifyToken, jwtVerify, InvoicesController.show)
router.put('/invoices/:id', verifyToken, jwtVerify, InvoicesController.update)
router.delete('/invoices/:id', verifyToken, jwtVerify, InvoicesController.destroy)

module.exports = router