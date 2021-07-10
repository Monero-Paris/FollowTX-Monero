const axios = require('axios')
//const crypto = require('crypto')
const Invoice = require('../../models/Invoice')


const Converter = {
	xmrToAtomicUnits(number) {
		return number * 1_000_000_000_000
	},

	atomicUnitsToXmr(number) {
		return (number / 1_000_000_000_000).toFixed(12)
	}
}

exports.index = async (request, response) => {

	let invoices = await Invoice
		.find()
		.sort({'_id': -1})

	return response.json(invoices)
}

exports.store = async (request,response) => {

	let res
	let data
	let result

	// TODO SET VAR
	res = await axios.post('http://localhost:38083/json_rpc', {
		"jsonrpc":"2.0",
		"id":"0",
		"method":"make_integrated_address"
	}).catch(error => {
		return response.status(418).json('Wallet RPC not connected')
	})

	data = res.data
	return response.json(data)
	result = data.result

	const integrated_address = result.integrated_address
	const payment_id = result.payment_id

	let amount = request.body.amount
	amount = Converter.xmrToAtomicUnits(amount)

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