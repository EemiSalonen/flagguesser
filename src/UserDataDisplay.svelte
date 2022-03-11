<script>
  import userDataStore from './userDataStore.js';
  import Button from './Button.svelte';
</script>

<div id="container">
  <table>
    <caption>User stats</caption>
    <tr>
      <th>Games played</th>
      <th>Correct answers</th>
      <th>Wrong answers</th>
    </tr>
    <tr>
      <td>{$userDataStore.playedGames}</td>
      <td>{$userDataStore.correctAnswers}</td>
      <td>{$userDataStore.wrongAnswers}</td>
    </tr>
  </table>
</div>

<style>
  #container {
    position: absolute;
    top: 20vh;
    left: 3.5vw;
  }
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
