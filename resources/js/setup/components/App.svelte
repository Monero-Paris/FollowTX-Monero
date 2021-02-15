<script>
	import { slide } from '../_stores'
    
	import Intro from './Intro'
	import Check_Software from './Check_Software'
	import Check_Database from './Check_Database'
    import Completed from './Completed'

    let bubbles = [
        'Intro',
        'Software',
        'Database',
        'Done'
    ]
</script>

<div class="container mt-5">

	<div class="col-md-8 mx-auto">
        <ul class="progress-indicator">
            {#each bubbles as bubble, index}
                <li class="{$slide === index ? 'active' : ($slide > index) ? 'completed' : 'pending' }">
                    <span class="bubble"></span>
                    <span>{bubble}</span>
                </li>
            {/each}
        </ul>

		{#if $slide === 0}
			<Intro />
		{:else if $slide === 1}
			<Check_Software />
		{:else if $slide === 2}
			<Check_Database />
        {:else if $slide === 3}
            <Completed />
		{/if}
	</div>
</div>

