const express = require('express')
const router = express.Router()

// Load middlewares
const { verifyToken, jwtVerify } = require('../middleware/JWT')

// Load controllers
const LoginController = require('../controllers/API/LoginController')
const InvoicesController = require('../controllers/API/InvoicesController')

router.post('/login', LoginController.login)

router.get('/invoices', verifyToken, jwtVerify, InvoicesController.index)
router.post('/invoices', verifyToken, jwtVerify, InvoicesController.store)
router.get('/invoices/:id', verifyToken, jwtVerify, InvoicesController.show)
router.put('/invoices/:id', verifyToken, jwtVerify, InvoicesController.update)
router.delete('/invoices/:id', verifyToken, jwtVerify, InvoicesController.destroy)

module.exports = router