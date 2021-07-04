const express = require('express')
const router = express.Router()


const RPC_Controller = require('../controllers/API/RPC_Controller')

const InvoicesController = require('../controllers/API/InvoicesController')

router.post('/rpc', RPC_Controller.fetch)

router.get('/invoices', InvoicesController.index)
router.post('/invoices', InvoicesController.store)
router.get('/invoices/:id', InvoicesController.show)
router.put('/invoices/:id', InvoicesController.update)
router.delete('/invoices/:id', InvoicesController.destroy)

module.exports = router