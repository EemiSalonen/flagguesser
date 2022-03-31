<script>
  import Restart from 'svelte-icons/fa/FaRedo.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import Button from './Button.svelte';

  export let gameHistory;
  export let countryDataArray;

  const restart = () => dispatch('restart');
  const sortScore = () => dispatch('sortScore');
  const sortTime = () => dispatch('sortTime');
  const sortUser = () => dispatch('sortUser');
  const sortGameNumber = () => dispatch('sortGameNumber');
  const sortContinent = () => dispatch('sortContinent');
</script>

<table in:fly={{ duration: 500, y: 1000, x: 0 }} out:fly={{ duration: 1 }}>
  <caption in:fly={{ duration: 500, y: 1000, x: 0 }} out:fly={{ duration: 1 }}
    >Leaderboards</caption
  >
  <tr>
    <th on:click={sortGameNumber}>Game number</th>
    <th on:click={sortScore}>Score</th>
    <th on:click={sortTime}>Time</th>
    <th on:click={sortUser}>Username</th>
    <th on:click={sortContinent}>Continent</th>
  </tr>
  {#each gameHistory as game (game.gameNumber)}
    <tr animate:flip={{ duration: 500 }}>
      <td>Game {game.gameNumber}</td>
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

<div
  id="restart"
  in:fly={{ duration: 500, y: 1000, x: 0 }}
  out:fly={{ duration: 1 }}
>
  <div class="icon">
    <Restart />
  </div>
  <Button on:click={restart}>Play again</Button>
</div>

<style>
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

  th:hover {
    background-color: var(--seccolor);
  }
  th:active {
    background-color: var(--thirdcolor);
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
  .icon {
    margin-top: 2px;
    width: 35px;
    height: 35px;
    color: var(--maincolor);
  }
  #restart {
    display: flex;
    margin-top: 20px;
    margin-right: 38px;
  }
</style>
