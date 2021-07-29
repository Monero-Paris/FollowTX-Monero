const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.login = (request, response) => {

    const user = {
        id: 1,
        username: 'toto',
        email: 'toto@toto.com'
    }

    const privateKey = fs.readFileSync('storage/keys/private.key')

    jwt.sign({ user }, privateKey, { expiresIn: '180s' }, (err, token) => {
        response.json({
            token
        })
    })
}