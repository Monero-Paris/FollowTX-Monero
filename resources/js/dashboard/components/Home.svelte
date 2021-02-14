<script>
	import axios from 'axios'
	import swal from 'sweetalert'

	import { colors, Helpers, view } from '../_stores'

	let invoices = []

	let some_data = {
		today: '',
		week: '',
		total: ''
	}

	async function fetchInvoices() {
		try {
			const url = '/api/invoices?limit=10'
			const response = await axios.get(url)
			const data = await response.data
			invoices = data
			console.log(data)
		} catch (error) {
			await swal('Error', 'Nope', 'error')
			console.log(error)
		}
	}
	fetchInvoices()

	async function countInvoicesToday() {
		try {
			const url = '/api/invoices?today=true'
			const response = await axios.get(url)
			const data = await response.data
			console.log(data)
			some_data.today = data

		} catch (error) {
			await swal('Error', 'Nope', 'error')
			console.log(error)
		}
	}
	countInvoicesToday()

	async function countInvoicesWeek() {
		try {
			const url = '/api/invoices?week=true'
			const response = await axios.get(url)
			const data = await response.data
			console.log(data)
			some_data.week = data

		} catch (error) {
			await swal('Error', 'Nope', 'error')
			console.log(error)
		}
	}
	countInvoicesWeek()

	async function countInvoicesTotal() {
		try {
			const url = '/api/invoices?total=true'
			const response = await axios.get(url)
			const data = await response.data
			console.log(data)
			some_data.total = data

		} catch (error) {
			await swal('Error', 'Nope', 'error')
			console.log(error)
		}
	}
	countInvoicesTotal()
</script>
<div class="row mt-3 text-center">
	<div class="col-md">
		<div class="card">
			<div class="card-header">
				Invoices today
			</div>
			<div class="card-body">
				{ some_data.today }
			</div>
		</div>
	</div>
	<div class="col-md">
		<div class="card">
			<div class="card-header">
				Invoices this week
			</div>
			<div class="card-body">
				{ some_data.week }
			</div>
		</div>
	</div>
	<div class="col-md">
		<div class="card">
			<div class="card-header">
				Invoices totals
			</div>
			<div class="card-body">
				{ some_data.total }
			</div>
		</div>
	</div>
</div>
<div class="row mt-3">
	<div class="col-md">
		<div class="card">
			<div class="card-header">
				Latest transactions
			</div>
			<div class="card-body">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Status</th>
							<th>Amount</th>
							<th>Payment_id</th>
							<th>Created at</th>
							<th>Updated at</th>
						</tr>
					</thead>
					<tbody>
						{#each invoices as invoice}
							<tr>
								<td>{ invoice._id }</td>
								<td><i class="bi bi-circle-fill text-{ colors[invoice.status] }"></i> { invoice.status }</td>
								<td>{ invoice.amount }</td>
								<td> {invoice.payment_id} </td>
								<td>{ Helpers.formatTime(invoice.created_at) }</td>
								<td>{ Helpers.formatTime(invoice.updated_at) }</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<div>
					<button class="btn btn-primary" on:click={ () => $view = 'transactions' }>View more invoices</button>
				</div>
			</div>
		</div>
	</div>
</div>