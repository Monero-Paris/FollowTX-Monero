const fs = require('fs')
const jwt = require('jsonwebtoken')

function jwtVerify(request, response, next) {
    jwt.verify(request.token, fs.readFileSync('storage/keys/private.key'), (error, auth_data) => {
        if (error) {
            response.sendStatus(403)
        }
        else {
            console.log(auth_data)
            next()
        }
    })
}

module.exports = jwtVerify