<script lang="ts">
  export let error: Boolean = false;
  export let success: Boolean = false;
  export let active: Boolean = true;
  export let marginBottom: Number = 0;

  $: classList = `generator__info 
  ${error ? "generator__info--error" : ""} 
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
    background-color: #f0f9ff;
    color: #0e7490;
    transition: opacity 200ms;
    opacity: 0;

    &--success {
      background-color: #d1fae5;
      color: #047857;
    }

    &--error {
      background-color: #ffe4e6;
      color: #e11d48;
    }

    &--active {
      opacity: 1;
    }
  }
</style>
