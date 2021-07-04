const Invoice = require('../models/Invoice')

exports.index = async (request, response) => {

	const id = request.query.id
	
	const invoice = await Invoice.findById(id)

	await response.render('gateway.html', {
		invoice
	})
}