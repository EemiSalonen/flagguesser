<script>
  export let disabled;
</script>

<button on:click {disabled}><slot /></button>

<style>
  button {
    border: var(--seccolor) solid 2px;
    background-color: var(--maincolor);
    color: var(--thirdcolor);
    font-size: 1.5em;
    width: 200px;
    margin: 5px;
  }
  button:active {
    background-color: var(--seccolor);
  }
  button:disabled {
    background-color: grey;
    border: grey solid 2px;
  }
</style>
