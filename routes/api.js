const express = require('express')
const router = express.Router()
const fs = require('fs')

const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/veryToken')

const RPC_Controller = require('../controllers/API/RPC_Controller')

const InvoicesController = require('../controllers/API/InvoicesController')

router.post('/login', (request, response) => {

    const user = {
        id: 1,
        username: 'toto',
        email: 'toto@toto.com'
    }

    const privateKey = fs.readFileSync('storage/keys/private.key');

    jwt.sign({ user }, privateKey, { expiresIn: '180s' }, (err, token) => {
        response.json({
            token
        })
    })
})

router.post('/test1', verifyToken, (request, response) => {
    jwt.verify(request.token, fs.readFileSync('storage/keys/private.key'), (error, auth_data) => {
        if (error) {
            response.sendStatus(403)
        } else {
            response.json({
                auth_data
            })
        }
    })
})

router.post('/rpc', RPC_Controller.fetch)

router.get('/invoices', verifyToken, InvoicesController.index)
router.post('/invoices', InvoicesController.store)
router.get('/invoices/:id', InvoicesController.show)
router.put('/invoices/:id', InvoicesController.update)
router.delete('/invoices/:id', InvoicesController.destroy)

module.exports = router