const axios = require('axios')
//const crypto = require('crypto')
const Invoice = require('../../models/Invoice')

exports.index = async (request, response) => {

	let invoices = await Invoice
		.find()
		.sort({'_id': -1})
		.limit(parseInt(request.query.limit) ?? 10)

	// for home
	if (request.query.today) {
		const now = new Date()
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		invoices = await Invoice
			.find({ created_at: {
				$gte: startOfToday
			}})
			.estimatedDocumentCount()
	}

	if (request.query.week) {
		invoices = await Invoice
			.find({
				timestamp: {
					$lte: new Date(),
					$gte: new Date( Date() - 7 )
				}
			})
			.estimatedDocumentCount()
	}

	if (request.query.total) {
		invoices = await Invoice.estimatedDocumentCount()
	}

	return response.json(invoices)
}

exports.store = async (request,response) => {

	let res 
	let data
	let result

	res = await axios.post('http://localhost:18089/json_rpc', {
		"jsonrpc":"2.0", 
		"id":"0", 
		"method":"make_integrated_address" 
	})

	data = res.data
	result = data.result

	const integrated_address = result.integrated_address
	const payment_id = result.payment_id

	const amount = request.body.amount
	const tx_description = request.body.tx_description ?? ''

	console.log(amount)

	res = await axios.post('http://localhost:18089/json_rpc', {
		"jsonrpc":"2.0", 
		"id":"0", 
		"method":"make_uri",
		"params": {
			"address": integrated_address,
			amount,
			//"payment_id": payment_id,
			tx_description
		}
	})

	data = await res.data
	result = await data.result

	const uri = await result.uri
	
	const doc = {
		amount,
		address: integrated_address,
		payment_id,
		tx_description,
		uri
	}

	const invoice = await Invoice.create(doc)

	await response.json(invoice)
}

exports.show = async (request,response) => {

	const id = request.body.id
	const invoice = await Payment.findById(id)

	await response.json(invoice)
}

exports.update = async (request,response) => {

	const id = request.body.id
	const invoice = await Invoice.findById(id)
}

exports.destroy = async (request,response) => {
	
	const id = request.body.id
	const invoice = await Invoice.findById(id)
}