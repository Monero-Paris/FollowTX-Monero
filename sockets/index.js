const axios = require('axios')

const Payment = require('../models/Payment')

let map_socket_payment = new Map()

module.exports = async (io) => {

	// gateway
	const gateway_namespace = io.of('/gateway')

	gateway_namespace.on('connection', async (socket) => {
		console.log('welcome in gateway')

		const payment_id = socket.handshake.query.payment_id

		const payment = await Payment.findById(payment_id)

		if (! payment) {
			return
		}

		const status = payment.status

		if (status === 'initialised' || status === 'pending' || status === 'cancelled') {
			payment.status = 'pending'
			payment.save()

			dashboard_namespace.emit('update_payment', payment_id, 'pending')
		}

		// console.log(payment_id)
		// console.log(socket.id)

		map_socket_payment.set(socket.id, payment_id)
		//	console.log(map_socket_payment)

		socket.on('disconnect', async () => {
			
			map_socket_payment.delete(socket.id)

			if (status === 'initialised' || status === 'pending' || status === 'cancelled') {

				payment.status = 'cancelled'
				payment.save()

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