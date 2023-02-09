<script>
  import { fly } from 'svelte/transition';

  import userDataStore from './userDataStore.js';
</script>

<div id="container" transition:fly={{ duration: 500, y: 0, x: -200 }}>
  <table>
    <caption transition:fly={{ duration: 500, y: 0, x: -200 }}
      >User stats: <strong><i>{$userDataStore.username}</i></strong></caption
    >
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
    background-color: var(--maincolor);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 3px 3px 5px 1px black;
  }
  tr,
  th,
  td {
    background-color: var(--maincolor);
    color: var(--thirdcolor);
    padding: 5px;
    border-collapse: collapse;
  }
  caption {
    font-size: 2em;
    color: var(--maincolor);
    margin: 10px;
  }
</style>
