const axios = require('axios')

const Invoice = require('../models/Invoice')

let map_socket_payment = new Map()

module.exports = async (io) => {

	// gateway
	const gateway_namespace = io.of('/gateway')

	gateway_namespace.on('connection', async (socket) => {
		console.log('welcome in gateway')

		const payment_id = socket.handshake.query.payment_id

		const invoice = await Invoice.findById(payment_id)

		if (! invoice) {
			return
		}

		const status = invoice.status

		if (status === 'initialised' || status === 'pending' || status === 'cancelled') {
			invoice.status = 'pending'
			invoice.save()
		}


		map_socket_payment.set(socket.id, payment_id)

		socket.on('disconnect', async () => {
			
			map_socket_payment.delete(socket.id)

			if (status === 'initialised' || status === 'pending' || status === 'cancelled') {

				invoice.status = 'cancelled'
				invoice.save()

			}
		})
	})

	return io 
}