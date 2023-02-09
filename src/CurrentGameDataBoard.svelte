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
    background-color: var(--maincolor);
    width: 25%;
    border-radius: 10px;
    padding: 10px;
  }
  tr,
  th,
  td {
    background-color: var(--maincolor);
    color: var(--thirdcolor);
  }
</style>
