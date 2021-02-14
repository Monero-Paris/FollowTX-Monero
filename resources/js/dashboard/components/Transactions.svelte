<script>
	import axios from 'axios'
	import swal from 'sweetalert'

	let transactions = {
		in: [],
		out: []
	}
	let balance = {}

	function formatLargeString(string) {

		if ( ! string) {
			return ''
		}

		const start = string.substring(0, 4)
		const end = string.substring(string.length - 4)

		return `${start}...${end}`
	}

	async function fetchTransactions() {
		try {
			const url = '/api/rpc'

			const url_rpc = 'http://localhost:18089/json_rpc'

			const object_rpc = {
				"jsonrpc":"2.0",
				"id":"0",
				"method":"get_transfers",
				"params": {
					"in": true,
					"out": true
				}
			}

			const object_complete = {
				url_rpc,
				object_rpc
			}

			const response = await axios.post(url, object_complete)

			const data = await response.data
			const result = data.result

			if (! Object.keys(result).length) {
				return
			}

			//console.log(result)

			transactions = result

		} catch (error) {
			swal('Nope', 'Nope', 'error')
		}
	}

	fetchTransactions()

	async function fetchBalance() {
		try {
			const url = '/api/rpc'

			const url_rpc = 'http://localhost:18089/json_rpc'

			const object_rpc = {
				"jsonrpc":"2.0",
				"id":"0",
				"method":"get_balance",
				"params": {
				}
			}

			const object_complete = {
				url_rpc,
				object_rpc
			}

			const response = await axios.post(url, object_complete)

			const data = await response.data
			const result = data.result
			//console.log(result)

			balance = result
		} catch (error) {
			swal('Nope', 'Nope', 'error')
		}
	}

	fetchBalance()
</script>

<div class="row mt-3">
	<div class="col">
		<h1>Transactions</h1>
		<div>
			<input type="text" class="form-control" placeholder="Search for txid payment_id or address">
		</div>

		<div class="card mt-3">
			<div class="card-header">
				Balance
			</div>
			<div class="card-body">
				Balance: { balance.balance } | blocks_to_unlock: { balance.blocks_to_unlock } | time_to_unlock: { balance.time_to_unlock }
			</div>
		</div>

		<div class="card mt-3">
			<div class="card-header">
				<span>In</span>
			</div>
			<div class="card-body">
				<table class="table">
					<thead>
						<tr>
							<th>Address</th>
							<th>Amount</th>
							<th>Payment_id</th>
							<th>Txid</th>
							<th>Confirmation</th>
						</tr>
					</thead>
					<tbody>
						{#each transactions.in as transaction}
							<tr>
								<td title="{transaction.address}">{ formatLargeString(transaction.address) }</td>
								<td>{ transaction.amount }</td>
								<td>{ transaction.payment_id }</td>
								<td>{ formatLargeString(transaction.txid) }</td>
								<td>{ transaction.confirmations }</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="card mt-3">
			<div class="card-header">
				<span>Out</span>
			</div>
			<div class="card-body">
				<table class="table">
					<thead>
					<tr>
						<th>Address</th>
						<th>Amount</th>
						<th>Payment_id</th>
						<th>Txid</th>
						<th>Confirmation</th>
					</tr>
					</thead>
					<tbody>
						{#each transactions.out as transaction}
							<tr>
								<td title="{transaction.address}">{ formatLargeString(transaction.address) }</td>
								<td>{ transaction.amount }</td>
								<td>{ transaction.payment_id }</td>
								<td>{ formatLargeString(transaction.txid) }</td>
								<td>{ transaction.confirmations }</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>