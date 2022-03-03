<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Button from './Button.svelte';
  export let selectedContinent;

  const start = () => dispatch('start');
</script>

<h2>Choose a continent and press start</h2>
<select bind:value={selectedContinent}>
  <option value="Europe">Europe</option>
  <option value="Africa">Africa</option>
  <option value="Asia">Asia</option>
  <option value="Americas">Americas</option>
</select>

<div id="start-div">
  <Button on:click={start}>Start</Button>
</div>

<style>
  select {
    background-color: var(--seccolor);
    font-size: 1.2em;
  }
</style>
