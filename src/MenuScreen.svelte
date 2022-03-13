<script>
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Button from './Button.svelte';
  export let selectedContinent;

  const start = () => dispatch('start');
</script>

<h2 in:fly={{ duration: 500, y: -1000, x: 0 }}>
  Choose a continent and press start
</h2>
<select
  in:fly={{ duration: 500, y: -1000, x: 0 }}
  bind:value={selectedContinent}
>
  <option value="Europe">Europe</option>
  <option value="Africa">Africa</option>
  <option value="Asia">Asia</option>
  <option value="Americas">Americas</option>
</select>

<div id="start-div" in:fly={{ duration: 500, y: -1000, x: 0 }}>
  <Button on:click={start}>Start</Button>
</div>

<style>
  select {
    background-color: var(--seccolor);
    font-size: 1.2em;
  }
  #start-div {
    margin: 50px;
  }
  h2 {
    color: var(--maincolor);
    text-shadow: 0 0 10px rgb(0, 0, 0);
  }
</style>
