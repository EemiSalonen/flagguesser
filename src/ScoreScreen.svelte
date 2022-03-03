<script>
  import Button from './Button.svelte';
  export let gameHistory;
</script>

<table>
  <tr>
    <th>Game number</th>
    <th>Score</th>
    <th>Time</th>
  </tr>
  {#each gameHistory as game, index}
    <tr>
      <td>Game {index + 1}</td>
      <td>{game.score}</td>
      <td>{game.time}</td>
    </tr>
  {/each}
</table>
<div>
  <Button on:click>Play again</Button>
</div>

<style>
  table {
    background-color: var(--seccolor);
    width: 25%;
  }
  tr {
    border: var(--seccolor);
    background-color: var(--seccolor);
  }
</style>
