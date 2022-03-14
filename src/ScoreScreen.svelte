<script>
  import { fly } from 'svelte/transition';
  import Button from './Button.svelte';

  export let gameHistory;
  export let countryDataArray;
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

<div id="flagboard" transition:fly={{ duration: 500, y: 0, x: 1000 }}>
  {#each countryDataArray as country}
    <div id="card">
      <div id="imagecont">
        <img src={country.flag} alt="flag" id="flag" />
      </div>
      <div id="carddata">
        <p class={country.answerBool === 'Correct!' ? 'correct' : 'false'}>
          {country.answerBool}
        </p>
        <p>
          {country.name}
        </p>
      </div>
    </div>
  {/each}
</div>

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
  #flagboard {
    position: absolute;
    top: 20vh;
    left: 75vw;
  }
  #card {
    display: flex;
    margin: 10px;
  }
  #imagecont {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
  }
  p {
    color: var(--maincolor);
    margin: 5px;
  }
  img {
    width: 50px;
  }
  .correct {
    color: rgb(102, 255, 0);
    max-width: 10px;
  }
  .false {
    color: rgb(255, 20, 0);
    max-width: 10px;
  }
</style>
