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
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;
  }
</style>
