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

<div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
        <div class="p-4 xl:w-1/3 md:w-1/2 w-full border-2">
            <div>
                Invoices today
            </div>
            <div>
                {some_data.today}
            </div>
        </div>
        <div class="p-4 xl:w-1/3 md:w-1/2 w-full border-2">
            <div>
                Invoices week
            </div>
            <div>
                {some_data.week}
            </div>
        </div>
        <div class="p-4 xl:w-1/3 md:w-1/2 w-full border-2">
            <div>
                Invoices total
            </div>
            <div>
                {some_data.total}
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            Latest transactions
        </div>
        <div class="card-body">
            <table class="shadow-lg bg-white">
                <thead>
                    <tr>
                        <th class="bg-blue-100 border text-left px-8 py-4">ID</th>
                        <th class="bg-blue-100 border text-left px-8 py-4">Status</th>
                        <th class="bg-blue-100 border text-left px-8 py-4">Amount</th>
                        <th class="bg-blue-100 border text-left px-8 py-4">Payment_id</th>
                        <th class="bg-blue-100 border text-left px-8 py-4">Created at</th>
                        <th class="bg-blue-100 border text-left px-8 py-4">Updated at</th>
                    </tr>
                </thead>
                <tbody>
                    {#each invoices as invoice}
                        <tr>
                            <td class="border px-8 py-4">{ invoice._id }</td>
                            <td class="border px-8 py-4"><i class="bi bi-circle-fill text-{ colors[invoice.status] }"></i> { invoice.status }</td>
                            <td class="border px-8 py-4">{ invoice.amount }</td>
                            <td class="border px-8 py-4"> {invoice.payment_id} </td>
                            <td class="border px-8 py-4">{ Helpers.formatTime(invoice.created_at) }</td>
                            <td class="border px-8 py-4">{ Helpers.formatTime(invoice.updated_at) }</td>
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