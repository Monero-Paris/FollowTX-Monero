const axios = require('axios')
const Invoice = require('../models/Invoice')

require('dotenv').config()


exports.handle = async (txid, io) => {

    let res
    let data
    let result

    res = await axios.post(process.env.DAEMON_RPC, {
        "jsonrpc":"2.0",
        "id":"0",
        "method":"get_transfer_by_txid",
        "params": {
            txid
        }
    })

    data = res.data
    result = data.result

    const payment_id = result.transfer.payment_id

    const status = 'completed'

    const invoice = await Invoice.findOne({
        payment_id
    })
    invoice.status = status
    invoice.transactions.push(txid)
    invoice.save()

    io.of('/gateway').emit('pop', txid)

    console.log('all done')
    console.log(invoice)
}