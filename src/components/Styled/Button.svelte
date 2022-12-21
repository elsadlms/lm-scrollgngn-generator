<script lang="ts">
  export let small: Boolean = false;
  export let disabled: Boolean = false;

  $: classList = `generator__button 
  ${small ? "generator__button--small" : ""}
  ${disabled ? "generator__button--disabled" : ""}
  `;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<p on:click class={classList}><slot /></p>

<style lang="scss">
  .generator__button {
    display: inline-block;
    font-family: "Marr sans";
    background-color: var(--gen-c-lighter);
    border: unset;
    cursor: pointer;
    font-size: 1em;
    border-radius: var(--gen-border-radius);
    transition: background-color 200ms;
    padding: 0.75rem 1.5rem;

    &--small {
      padding: 0.5rem 1.5rem;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.6;
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--gen-c-light);
      }
    }
  }
</style>
