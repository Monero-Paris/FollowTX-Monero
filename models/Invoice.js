const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
	{
		address: String,
	    status:  {
	    	type: String,
	    	default: 'initialised' // initialised, pending, completed, cancelled
	    },
	    amount: Number,
	 	payment_id: String,
		transactions: [],
	 	tx_description: String,
	 	uri: String,
	}, 
	{
		timestamps: 
		{ 
			createdAt: 'created_at', 
			updatedAt: 'updated_at' 
		}
	}
)

const Invoice = mongoose.model('Invoice', schema)

module.exports = Invoice