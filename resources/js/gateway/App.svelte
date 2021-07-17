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
		alert(`successfully copied to clipboard! ${e}`);
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
		<!--
		<img src="/img/logo2.svg" alt="logo" class="logo">
		 -->
	</div>
	<div class="gateway-body">
		<div class="data">

			<CopyToClipboard text="{Converter.atomicUnitsToXmr(invoice.amount)}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
				<div class="kv" on:click={copy}>
					<div class="key">
						Amount:
					</div>
					<div class="value">
						{Converter.atomicUnitsToXmr(invoice.amount)} XMR
					</div>
				</div>
			</CopyToClipboard>

			<CopyToClipboard text="{invoice.address}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
				<div class="kv" on:click={copy}>
					<div class="key">
						Address:
					</div>
					<div class="value">
						{invoice.address}
					</div>
				</div>
			</CopyToClipboard>

			<CopyToClipboard text="{invoice.uri}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
				<div class="kv" on:click={copy}>
					<div class="key">
						Uri:
					</div>
				  <div class="value">
					  {invoice.uri}
				  </div>
				</div>
			</CopyToClipboard>
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

<div class="logo-container">
	<img src="/img/logo2.svg" alt="logo" class="logo">
</div>

