<script>
	import ioClient from 'socket.io-client'
	import QrCode from 'svelte-qrcode'
	import CopyToClipboard from "svelte-copy-to-clipboard";
	import swal from 'sweetalert'

	let invoice = window.invoice
	//payment.status = 'completed'

	// socket io
	let io = ioClient(`/gateway`, {
		query: {
			page: 'gateway',
			invoice: invoice._id
		}
	})

	io.on('pop', (message) => {
		invoice.status = 'completed'
		swal('Payment received', 'thanks you', 'success')
	})

	const handleSuccessfullyCopied = (e) => {
		alert(`successfully copied to clipboard!`);
	}

	const handleFailedCopy = () => {
		alert('failed to copy :(');
	}

	const Converter = {
		xmrToAtomicUnits(number) {
			return number * 1_000_000_000_000
		},

		atomicUnitsToXmr(number) {
			return (number / 1_000_000_000_000).toFixed(12)
		}
	}

	console.info('invoice id:', invoice._id)
	console.info('payment id:', invoice.payment_id)
</script>

<div class="gateway-container">

	<div class="gateway-header">
		<img src="/img/logo2.svg" alt="logo">
	</div>

	<div class="gateway-body">
		<div class="data">

			<div class="kv">
				<div class="key">
					Amount:
				</div>

				<CopyToClipboard text="{Converter.atomicUnitsToXmr(invoice.amount)}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
				      <button class="value" on:click={copy}>{Converter.atomicUnitsToXmr(invoice.amount)} XMR</button>
				</CopyToClipboard>
			</div>

			<div class="kv">
				<div class="key">
					Address:
				</div>

				<CopyToClipboard text="{invoice.address}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
				      <button class="value" on:click={copy}>{invoice.address}</button>
				</CopyToClipboard>
			</div>

			<div class="kv">
				<div class="key">
					Uri:
				</div>

				<CopyToClipboard text="{invoice.uri}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
				      <button class="value" on:click={copy}>{invoice.uri}</button>
				</CopyToClipboard>
			</div>
		</div>

		<div class="qrcode-container">
			<QrCode value="{invoice.uri}" padding="0" size="300" background="#ffffff" />
		</div>
	</div>
</div>

{#if invoice.status === 'completed'}
	<div>
		<span>Payment completed</span>
		<span><a href="/yourwebsite">Go back to website</a></span>
	</div>
{/if}