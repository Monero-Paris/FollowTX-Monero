<script>
	import { fetchDataFromRpc, Helpers } from '../_stores'

	let transactions = {
		in: [],
		out: []
	}

	fetchDataFromRpc('wallet', {
		"jsonrpc":"2.0",
		"id":"0",
		"method":"get_transfers",
		"params": {
			"in": true,
			"out": true
		}
	}).then(data => transactions = data)

	let balance = {}
	fetchDataFromRpc('wallet', {
		"jsonrpc":"2.0",
		"id":"0",
		"method":"get_balance",
		"params": {
		}
	}).then(data => balance = data)

</script>

<div class="row mt-3">
	<div class="col">
		<h1 class="h3">Transactions</h1>
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
						{#if transactions.in}
							{#each transactions.in as transaction}
								<tr>
									<td title="{transaction.address}"><span on:click={ () => '' }>{ Helpers.formatLargeString(transaction.address) }</span> <i class="bi bi-clipboard"></i></td>
									<td>{ transaction.amount }</td>
									<td>{ transaction.payment_id }</td>
									<td><span on:click={ () => '' }>{ Helpers.formatLargeString(transaction.txid) }</span> <i class="bi bi-clipboard"></i></td>
									<td>{ transaction.confirmations }</td>
								</tr>
							{/each}
						{/if}
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
						{#if transactions.out}
							{#each transactions.out as transaction}
								<tr>
									<td title="{transaction.address}">{ Helpers.formatLargeString(transaction.address) }</td>
									<td>{ transaction.amount }</td>
									<td>{ transaction.payment_id }</td>
									<td>{ Helpers.formatLargeString(transaction.txid) }</td>
									<td>{ transaction.confirmations }</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>