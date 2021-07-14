const Invoice = require('../models/Invoice')

module.exports = async (io) => {

	// gateway
	const gateway_namespace = io.of('/gateway')

	gateway_namespace.on('connection', async (socket) => {
		console.log('welcome in gateway')

		const invoice_id = socket.handshake.query.id

		const invoice = await Invoice.findById(invoice_id)

		if (! invoice) {
			return
		}

		const status = invoice.status

		if (status === 'initialised' || status === 'pending' || status === 'cancelled') {
			invoice.status = 'pending'
			invoice.save()
		}

		socket.on('disconnect', async () => {

			if (status === 'initialised' || status === 'pending' || status === 'cancelled') {

				invoice.status = 'cancelled'
				invoice.save()

			}
		})
	})

	return io 
}