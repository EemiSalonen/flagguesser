<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Button from './Button.svelte';
  export let answerButtonData;

  console.log(answerButtonData);
</script>

<div>
  {#each answerButtonData as country}
    <Button
      on:click={() => {
        dispatch('sendAnswer', country.name);
      }}>{country.name}</Button
    >
  {/each}
</div>

<style>
  div {
    width: 50%;
  }
</style>
