<script lang="ts">
  export let small: Boolean = false;

  $: classList = `generator__button 
  ${small ? "generator__button--small" : ""}
  `;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<p on:click class={classList}><slot /></p>

<style lang="scss">
  .generator__button {
    display: inline-block;
    font-family: "Marr sans";
    background-color: #e2e8f0;
    color: #334155;
    border: unset;
    cursor: pointer;
    font-size: 1em;
    border-radius: 6px;
    transition: background-color 200ms;
    padding: 0.75rem 1.5rem;
    margin-top: 1em;

    @media (hover: hover) {
      &:hover {
        background-color: #cbd5e1;
      }
    }
  }
</style>
