<script>
  export let currentRoundTime;
  export let currentGameScore;
</script>

<table>
  <tr>
    <th>Score</th>
    <th>Timer</th>
  </tr>
  <tr>
    <td>{currentGameScore}</td>
    <td>{currentRoundTime}</td>
  </tr>
</table>

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
