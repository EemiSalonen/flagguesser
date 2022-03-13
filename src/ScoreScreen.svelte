<script>
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import Button from './Button.svelte';

  export let gameHistory;
</script>

<table in:fly={{ duration: 500, y: 1000, x: 0 }}>
  <caption in:fly={{ duration: 500, y: 1000, x: 0 }}>Leaderboards</caption>
  <tr>
    <th>Game number</th>
    <th>Score</th>
    <th>Time</th>
    <th>Username</th>
    <th>Continent</th>
  </tr>
  {#each gameHistory as game, index}
    <tr>
      <td>Game {index + 1}</td>
      <td>{game.score}</td>
      <td>{game.time}</td>
      <td>{game.username}</td>
      <td>{game.continent}</td>
    </tr>
  {/each}
</table>

<div in:fly={{ duration: 500, y: 1000, x: 0 }}>
  <Button on:click>Play again</Button>
</div>

<style>
  table {
    background-color: var(--seccolor);
    border: var(--maincolor) solid 2px;
    border-collapse: collapse;
  }
  tr,
  th,
  td {
    border: var(--maincolor) solid 2px;
    background-color: var(--seccolor);
    padding: 5px;
    border-collapse: collapse;
  }
  caption {
    font-size: 2em;
    color: var(--maincolor);
    margin: 10px;
  }
</style>
