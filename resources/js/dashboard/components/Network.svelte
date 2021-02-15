<script async>
	import axios from 'axios'
	import swal from 'sweetalert'

	import { fetchDataFromRpc } from '../_stores';

	let daemon = {
		height: null,
		height_without_bootstrap: null,
		nettype: null,
		status: null,
		synchronized: null,
		busy_syncing: null,
		version: null,
		update_available: null,
		free_space: null,

	}

	let percent_sync

	fetchDataFromRpc('daemon', {
		"jsonrpc": "2.0",
		"id":"0",
		"method":"get_info",
		"params": {}
	}).then(data => {
		daemon.height = data.height
		daemon.height_without_bootstrap = data.height_without_bootstrap
		daemon.nettype = data.nettype
		daemon.status = data.status
		daemon.synchronized = data.synchronized
		daemon.busy_syncing = data.busy_syncing
		daemon.version = data.version
		daemon.busy_syncing = data.busy_syncing
		daemon.update_available = data.update_available
		daemon.free_space = data.free_space

		percent_sync = daemon.height_without_bootstrap * 100 / daemon.height
	})

	let wallet = {
		address: '',
		balance: ''
	}
	fetchDataFromRpc('wallet', {
		"jsonrpc": "2.0",
		"id": "0",
		"method": "get_address",
		"params": {

		}
	}).then(data => wallet.address = data.address)

	fetchDataFromRpc('wallet', {
		"jsonrpc": "2.0",
		"id": "0",
		"method": "get_balance",
		"params": {

		}
	}).then(data => wallet.balance = data.balance)

	fetchDataFromRpc('wallet', {
		"jsonrpc": "2.0",
		"id": "0",
		"method": "get_version",
		"params": {

		}
	}).then(data => wallet.version = data.version)
</script>

<div class="row mt-3">
	<h1 class="h3">Network</h1>

	<div class="col-md-6">
		<div class="card mt-3">
			<div class="card-header">
				Wallet sync
			</div>
			<div class="card-body">
				<span class="">22332323 / 232323232323233</span> |
				<span>90%</span>
				<div class="progress">
					<div class="progress-bar" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
			</div>
		</div>

		<div class="card mt-3">
			<div class="card-header">
				Wallet info
			</div>
			<div class="card-body">
				<table class="table table-bordered table-striped" style="table-layout: fixed;word-wrap: break-word;">
					<tbody>
					{#each Object.keys(wallet) as key}
						<tr>
							<td>{key}</td>
							<td>{wallet[key]}</td>
						</tr>
					{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>


	<div class="col-md-6">

		<div class="card mt-3">
			<div class="card-header">
				Daemon
			</div>
			<div class="card-body">
				<span class="">{daemon.height_without_bootstrap} / {daemon.height}</span> |
				<span>  { percent_sync } %</span>
				<div class="progress">
					<div class="progress-bar { daemon.synchronized ? 'bg-success' : 'progress-bar-striped progress-bar-animated' }" role="progressbar" style="width: { percent_sync }%;" aria-valuenow="{ percent_sync }" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
			</div>
		</div>

		<div class="card mt-3">
			<div class="card-header d-flex justify-content-between align-items-center">
				Network info
			</div>
			<div class="card-body">
				<table class="table table-bordered table-striped">
					<tbody>
					{#each Object.keys(daemon) as key}
						<tr>
							<td>{key}</td>
							<td>{daemon[key]}</td>
						</tr>
					{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>