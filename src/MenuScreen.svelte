<script>
  import { fly } from 'svelte/transition';

  import PlayCircle from 'svelte-icons/io/IoIosPlayCircle.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Button from './Button.svelte';
  export let selectedContinent;
  export let loggedOut;

  const start = () => dispatch('start');
</script>

<h2 in:fly={{ duration: 500, y: -1000, x: 0 }}>
  Choose a continent and login then press start
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
  <div id="icon">
    <PlayCircle />
  </div>
  <div>
    <Button disabled={loggedOut} on:click={start}>Start</Button>
  </div>
</div>

<style>
  select {
    background-color: var(--maincolor);
    color: var(--thirdcolor);
    font-size: 1.2em;
  }
  #start-div {
    display: flex;
    margin: 50px;
    margin-right: 88px;
  }
  h2 {
    color: var(--maincolor);
    text-shadow: 0 0 10px rgb(0, 0, 0);
  }
  #icon {
    width: 40px;
    height: 40px;
    color: var(--maincolor);
    margin-top: 2px;
  }
</style>
