<script lang="ts">
  export let error: Boolean = false;
  export let warning: Boolean = false;
  export let success: Boolean = false;
  export let active: Boolean = true;
  export let marginBottom: Number = 0;

  $: classList = `generator__info 
  ${error ? "generator__info--error" : ""} 
  ${warning ? "generator__info--warning" : ""} 
  ${success ? "generator__info--success" : ""} 
  ${active ? "generator__info--active" : ""} 
  `;

  $: styles = `margin-bottom: ${marginBottom}px`;
</script>

<div class={classList} style={styles}><slot /></div>

<style lang="scss">
  .generator__info {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: var(--gen-border-radius);
    background-color: var(--gen-c-accent-light);
    color: var(--gen-c-accent);
    transition: opacity 200ms;
    opacity: 0;

    &--success {
      background-color: var(--gen-c-success-light);
      border-bottom: 1px solid var(--gen-c-success);
      color: var(--gen-c-success);
    }

    &--error {
      background-color: var(--gen-c-error-light);
      border-bottom: 1px solid var(--gen-c-error);
      color: var(--gen-c-error);
    }

    &--warning {
      background-color: var(--gen-c-warning-light);
      border-bottom: 1px solid var(--gen-c-warning);
      color: var(--gen-c-warning);
    }

    &--active {
      opacity: 1;
    }
  }
</style>
