const express = require('express')
const router = express.Router()

const SetupController = require('../controllers/API/SetupController')

const RPC_Controller = require('../controllers/API/RPC_Controller')

const UserController = require('../controllers/API/UserController')
const InvoicesController = require('../controllers/API/InvoicesController')


router.post('/setup/database/test', SetupController.databaseTest)
router.post('/setup/database/create-user', SetupController.databaseCreateUser)

router.post('/rpc', RPC_Controller.fetch)

router.get('/user', UserController.index)

router.get('/invoices', InvoicesController.index)
router.post('/invoices', InvoicesController.store)
router.get('/invoices/:id', InvoicesController.show)
router.put('/invoices/:id', InvoicesController.update)
router.delete('/invoices/:id', InvoicesController.destroy)

module.exports = router