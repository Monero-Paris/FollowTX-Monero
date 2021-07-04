const express = require('express')
const router = express.Router()
const fs = require('fs')

const jwt = require('jsonwebtoken')

const RPC_Controller = require('../controllers/API/RPC_Controller')

const InvoicesController = require('../controllers/API/InvoicesController')

router.post('/login', (request, response) => {

    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    const privateKey = fs.readFileSync('storage/keys/private.key');

    jwt.sign({user}, privateKey, { expiresIn: '180s' }, (err, token) => {
        response.json({
            token
        })
    })
})

router.post('/rpc', RPC_Controller.fetch)

router.get('/invoices', InvoicesController.index)
router.post('/invoices', InvoicesController.store)
router.get('/invoices/:id', InvoicesController.show)
router.put('/invoices/:id', InvoicesController.update)
router.delete('/invoices/:id', InvoicesController.destroy)

module.exports = router