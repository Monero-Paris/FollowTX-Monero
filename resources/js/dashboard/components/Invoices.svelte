<script>
	import { onMount } from 'svelte';
	import axios from 'axios'
	import { Helpers, colors, Converter } from '../_stores'
	import ioClient from 'socket.io-client'

	// use full
	import { modal } from 'bootstrap'

	let invoices = []

	// load invoices
	onMount(async () => {
		const response = await axios.get('/api/invoices')
		const data = await response.data

		invoices = data
	})

	let amount = 12
	let tx_description = 'a  short tx'

	async function createPayment() {
		const response = await axios.post('/api/invoices', { amount, tx_description })
		const data = await response.data

		console.log(data)

		invoices.unshift(data)

		invoices = invoices
	}






	let io = ioClient('/dashboard', {
		query: {
			page: 'dashboard'
		}
	})

	function setPaymentStatus(id, status) {

		invoices.find(element => element._id === id).status = status

		invoices = invoices
	}
	
	io.on('update_payment', (id, status) => {
		setPaymentStatus(id, status)
	})
	
</script>



<!-- Modal -->
<div class="modal fade" id="create-new-invoice" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Create new invoice</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form on:submit|preventDefault={ createPayment }>
					<div class="mb-3">
						<span>Amount</span>
						<input type="text" placeholder="amount" bind:value={amount} class="form-control">
					</div>

					<div class="mb-3">
						<span>Description</span>
						<input type="text" placeholder="tx_description" bind:value={tx_description} class="form-control">
					</div>

					<button type="submit" class="btn btn-primary">Send</button>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

			</div>
		</div>
	</div>
</div>

<div class="row mt-3">
	<h1 class="h3">Invoices</h1>
	<div class="col-md">
		<button type="button" class="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#create-new-invoice">
			Create new invoice
		</button>
	
		<div class="card">
			<div class="card-body">
				<table class="table">
					<thead>
						<tr>
							<th>ID <small>(in database)</small></th>
							<th>Status</th>
							<th>Amount</th>
							<th>Payment_id <small>(in wallet)</small></th> 
							<th>Created at</th>
							<th>Updated at</th>
						</tr>
					</thead>
					<tbody>
						{#each invoices as invoice }
							<tr>
								<td>{ invoice._id }</td>
								<td><i class="bi bi-circle-fill text-{ colors[invoice.status] }"></i> { invoice.status }</td>
								<td>{ Converter.atomicUnitsToXmr(invoice.amount) }</td>
								<td>{ Helpers.formatLargeString(invoice.payment_id) }</td>
								<td>{ Helpers.formatTime(invoice.created_at) }</td>
								<td>{ Helpers.formatTime(invoice.updated_at) }</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<div class="row mt-3">
	<div class="col-md">

	</div>
</div>