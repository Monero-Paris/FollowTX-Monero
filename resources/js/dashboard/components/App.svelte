<script>
	import { view } from '../_stores'

	import Home from './Home'
	import Network from './Network'
	import Transactions from './Transactions'
	import Invoices from './Invoices'
	import Processing from './Processing'
	import Account from './Account'

	const items = [
		{
			title: 'Home',
			view: 'home',
			icon: 'bi bi-speedometer2'
		},
		{
			title: 'Network',
			view: 'network',
			icon: 'bi bi-hdd-network'
		},
		{
			title: 'Invoices',
			view: 'invoices',
			icon: 'bi bi-credit-card'
		},
		{
			title: 'Transactions',
			view: 'transactions',
			icon: 'bi bi-wallet2'
		},
		{
			title: 'Account',
			view: 'account',
			icon: 'bi bi-gear'
		},
		{
			title: 'Processing',
			view: 'processing',
			icon: 'bi bi-arrow-repeat'
		}
	]
</script>

<div class="container">
	<nav class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-900 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4">
		
			<div class="">
				<img src="/img/logo2.svg" alt="" style="width: 100px;">
			</div>
			<ul>
			{#each items as item, i}
				<li on:click={ () => $view = item.view } class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
					<i class="{item.icon}"></i>

					<span class="mx-4 font-medium">{item.title}</span>
				</li>
			{/each}
		</ul>
	</nav>
	<main class="relative md:ml-64">
		{#if $view === 'home'}
			<Home />
		{:else if $view === 'network'}
			<Network />
		{:else if $view === 'invoices'}
			<Invoices />
		{:else if $view === 'transactions'}
			<Transactions />
		{:else if $view === 'account'}
			<Account />
		{:else if $view === 'processing'}
			<Processing />
		{/if}
	</main>
</div>