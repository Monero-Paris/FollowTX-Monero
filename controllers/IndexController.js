const Meta = require('../models/Meta')

exports.index = async (request, response) => {

    const setup_done = await Meta.findOne({ key: 'setup_done' })

    if ( ! setup_done ) {
        return response.render('setup.html')
    }

    return response.render('login.html')
}