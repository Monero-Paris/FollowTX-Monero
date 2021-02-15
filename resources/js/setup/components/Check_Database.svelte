<script>
	import { slide } from '../_stores'
	import axios from 'axios'

	import swal from 'sweetalert'

	let test_connection = false
	let user_created = false

	let user = {
		name: '',
		password: ''
	}

	async function testConnection() {
		const url = '/api/setup/database/test'

		const response = await axios.post(url)
		const data = await response.data

		if (data) {
			swal('Good', 'The database is set', 'success')
			test_connection = true
		}
	}

	async function createUser() {

		if ( ! user.name || ! user.password ) {
			return swal('Error', 'Name and password most be defined', 'error')
		}

		const url = '/api/setup/database/create-user'

		const response = await axios.post(url, { user })
		const data = await response.data

		if (data) {
			swal('Good', 'The admin is created', 'success')
			user_created = true
		}
	}
</script>

<div class="card">
	<div class="card-header">
		Check database
	</div>
	<div class="card-body">
		<form>
			<fieldset>
				<legend>Admin user</legend>

				<div class="form-group mb-3">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">Name</div>
						</div>
						<input type="text" class="form-control" placeholder="Name" bind:value="{user.name}">
					</div>
				</div>

				<div class="form-group mb-3">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">Password</div>
						</div>
						<input type="text" class="form-control" placeholder="Password" bind:value="{user.password}">
					</div>
				</div>

			</fieldset>
			

			<div class="form-group mb-3">
				<button class="btn btn-secondary" type="button" on:click={ () => testConnection() }>Test database</button>
				<button class="btn btn-secondary { (! test_connection || user_created) ? 'disabled' : '' }" type="button" on:click={ () => createUser() }>Create uer</button>
			</div>
		</form>

		<div class="d-flex justify-content-between mt-3">
			<button class="btn btn-primary" on:click={ () => $slide-- }><i class="bi bi-arrow-left-short"></i> Previous</button>
			<button class="btn btn-primary { ! user_created ? 'disabled' : ''}" on:click={ () => $slide++ }>Next <i class="bi bi-arrow-right-short"></i></button>
		</div>
	</div>
</div>