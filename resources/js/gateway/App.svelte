<script>
	import ioClient from 'socket.io-client'
	import QrCode from 'svelte-qrcode'
	import CopyToClipboard from "svelte-copy-to-clipboard"

	import { Converter } from './helpers'
	import { handleSuccessfullyCopied, handleFailedCopy, popPayment } from './functions'

	let invoice = window.invoice

	// socket io
	let io = ioClient(`/gateway`, {
		query: {
			id: invoice._id
		}
	})

	io.on('pop', (tx_id) => popPayment(tx_id, invoice))

	console.info('invoice id:', invoice._id)
	console.info('payment id:', invoice.payment_id)
</script>

{#if invoice.status === 'completed'}
	<div class="bg-green-300 text-center p-6">
		<span>Payment completed</span>
		<span><a href="/yourwebsite">Go back to website</a></span>
	</div>
{/if}

<div class="text-xl text-center my-3">
	Payment checkout
</div>

<CopyToClipboard text="{Converter.atomicUnitsToXmr(invoice.amount)}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
	<div class="m-6 bg-white shadow-md cursor-pointer transition duration-100 ease-in hover:bg-gray-200">
		<div class="kv my-4" on:click={copy}>
			<div class="p-3">
				Amount:
			</div>
			<div class="p-3">
				{Converter.atomicUnitsToXmr(invoice.amount)} XMR
			</div>
		</div>
	</div>
</CopyToClipboard>

<CopyToClipboard text="{invoice.address}" on:copy={handleSuccessfullyCopied} on:fail={handleFailedCopy} let:copy>
	<div class="m-6 bg-white shadow-md cursor-pointer transition duration-100 ease-in hover:bg-gray-200">
		<div class="kv" on:click={copy}>
			<div class="p-3">
				Address:
			</div>
			<div class="p-3 break-words">
				{invoice.address}
			</div>
		</div>
	</div>
</CopyToClipboard>

<div class="m-6 flex justify-between">
	<QrCode value="{invoice.uri}" padding="10" size="300" background="#ffffff" />
	<div class="flex items-end">
		<div>
			<img src="/img/Monero-Logo.svg" alt="logo" class="logo" style="width: 250px;">
		</div>
		<div>
			<img src="/img/logo2.svg" alt="logo" class="logo" style="width: 90px;">
		</div>
	</div>
</div>