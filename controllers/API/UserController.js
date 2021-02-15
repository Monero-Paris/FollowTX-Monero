const User = require('../../models/User')

exports.index = async (request, response) => {
    const user = await User.find()

    await response.json(user)
}