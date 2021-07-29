const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.jwtVerify = (request, response, next) => {
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

exports.verifyToken = (request, response, next) => {
    // Get auth header value
    const bearerHeader = request.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        request.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        response.sendStatus(403);
    }
}