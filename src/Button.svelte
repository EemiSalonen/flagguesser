<script>
  export let disabled;
</script>

<button on:click {disabled}><slot /></button>

<style>
  button {
    background-color: var(--maincolor);
    color: var(--thirdcolor);
    border-radius: 10px;
    font-size: 1.5em;
    width: 200px;
    margin: 5px;
    border: none;
    box-shadow: 3px 3px 5px 1px black;
  }
  button:active {
    background-color: var(--seccolor);
  }
  button:disabled {
    background-color: grey;
  }
</style>
