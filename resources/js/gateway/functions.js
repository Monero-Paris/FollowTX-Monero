import sweetalert from 'sweetalert'

/**
 *
 * @param e
 */
const handleSuccessfullyCopied = (e) => {
    alert(`successfully copied to clipboard! ${e}`)
    console.log(e)
}

/**
 *
 * @param e
 */
const handleFailedCopy = (e) => {
    alert('failed to copy :(');
}

/**
 *
 * @param tx_id
 * @param invoice
 */
async function popPayment(tx_id, invoice) {
    invoice.status = 'completed'
    await sweetalert('Payment accepted', 'Thanks for purchase', 'success')
    return invoice = invoice
}

export {
    handleSuccessfullyCopied,
    handleFailedCopy,
    popPayment
}