const Payment = require('../models/Payment')

let map_socket_payment = new Map()

module.exports = async (io) => {

	// gateway
	const gateway_namespace = io.of('/gateway')

	gateway_namespace.on('connection', async (socket) => {
		console.log('welcome in gateway')

		const payment_id = socket.handshake.query.payment_id

		const payment = await Payment.findById(payment_id)
		
		switch (payment.status) {
			case 'initialised':

				await payment.update({ status: 'pending' })
				dashboard_namespace.emit('update_payment', payment_id, 'pending')

				break
			case 'pending':

				break
			case 'completed':

				break
			case 'cancelled':

				await payment.update({ status: 'pending' })
				dashboard_namespace.emit('update_payment', payment_id, 'pending')
				
				break
		}

		

		// console.log(payment_id)
		// console.log(socket.id)

		map_socket_payment.set(socket.id, payment_id)
		console.log(map_socket_payment)

		socket.on('test', () => {
			io.to(socket.id).emit('pop', socket.id)
		})

		//socket.emit('update')

		socket.on('disconnect', async () => {
			map_socket_payment.delete(socket.id)

			switch (payment.status) {
				case 'initialised':

					await payment.update({ status: 'cancelled' })
					dashboard_namespace.emit('update_payment', payment_id, 'cancelled')

					break
				case 'pending':

					await payment.update({ status: 'cancelled' })
					dashboard_namespace.emit('update_payment', payment_id, 'cancelled')

					break
				case 'completed':

					break
				case 'cancelled':

					await payment.update({ status: 'cancelled' })
					dashboard_namespace.emit('update_payment', payment_id, 'cancelled')

					break
			}
		})
	})

	// dashboard
	const dashboard_namespace = io.of('/dashboard')

	dashboard_namespace.on('connection', socket => {

	})
}