import { writable } from 'svelte/store'

// home network transactions payments

export const view = writable('home')

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