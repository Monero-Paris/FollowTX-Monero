import { writable } from 'svelte/store'
import axios from "axios";

// home network transactions payments
export const view = writable('transactions')

export const colors = {
	initialised: 'secondary',
	pending: 'primary',
	completed: 'success',
	cancelled: 'danger'
}

export const Helpers = {
	
	formatLargeString(string) {
		const start = string.substring(0, 4)
		const end = string.substring(string.length - 4)

		return `${start}...${end}`
	},

	formatTime(date) {
		const time = new Date(date)
		const day = time.getDate()
		const month = time.getMonth()
		const year = time.getFullYear()
		const hour = time.getHours()
		const minutes = time.getMinutes()

		return `${day}/${month}/${year} ${hour}:${minutes}`
	}
}

export const Converter = {
	xmrToAtomicUnits(number) {
		return number * 1_000_000_000_000
	},

	atomicUnitsToXmr(number) {
		return (number / 1_000_000_000_000).toFixed(12)
	}
}

export async function fetchDataFromRpc(type, object_rpc) {

	let url_rpc = {
		daemon: 'http://localhost:38081/json_rpc',
		wallet: 'http://localhost:18089/json_rpc'
	}

	url_rpc = url_rpc[type]

	const url = '/api/rpc'

	const object_complete = {
		url_rpc,
		object_rpc
	}

	const response = await axios.post(url, object_complete)
	const data = await response.data
	const result = data.result

	return result
}
