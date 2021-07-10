require('dotenv').config()
const axios = require('axios')
//const crypto = require('crypto')
const Converter = require('../../helpers/Converter')
const Invoice = require('../../models/Invoice')
const ObjectId = require('mongoose').Types.ObjectId

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

	res = await axios.post(process.env.DAEMON_RPC, {
		"jsonrpc":"2.0",
		"id":"0",
		"method":"make_integrated_address"
	}).catch(error => {
		return response.status(418).json('Wallet RPC not connected')
	})

	data = res.data
	result = data.result

	const integrated_address = result.integrated_address
	const payment_id = result.payment_id

	let amount = request.body.amount

	amount = Converter.xmrToAtomicUnits(amount)

	const tx_description = request.body.tx_description ?? ''

	console.log(amount)

	res = await axios.post(process.env.DAEMON_RPC, {
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

	return  response.status(201).json(invoice)
}

exports.show = async (request,response) => {

	let id = request.params.id

	id = ObjectId(id)

	const invoice = await Invoice.findById(id)

	return response.json(invoice)
}

exports.update = async (request,response) => {

	let id = request.params.id

	id = ObjectId(id)

	let status = request.body.status

	const invoice = await Invoice.findByIdAndUpdate(id, {
		status
	})

	return response.status(200).json(invoice)
}

exports.destroy = async (request,response) => {

	let id = request.params.id

	id = ObjectId(id)

	await Invoice.findByIdAndDelete(id)

	return response.status(200).json('invoice deleted')
}