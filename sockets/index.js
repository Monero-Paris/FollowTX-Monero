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

			dashboard_namespace.emit('update_payment', payment_id, 'pending')
		}


		map_socket_payment.set(socket.id, payment_id)

		socket.on('disconnect', async () => {
			
			map_socket_payment.delete(socket.id)

			if (status === 'initialised' || status === 'pending' || status === 'cancelled') {

				invoice.status = 'cancelled'
				invoice.save()

				dashboard_namespace.emit('update_payment', payment_id, 'cancelled')
			}
		})
	})

	// dashboard
	const dashboard_namespace = io.of('/dashboard')

	dashboard_namespace.on('connection', socket => {

		socket.on('refresh-processing-client-ask-server', () => {
			socket.emit('refresh-processing-server-answer-client', map_socket_payment)
		})
	})

	return io 
}