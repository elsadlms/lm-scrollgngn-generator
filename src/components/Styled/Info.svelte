<script lang="ts">
  export let error: Boolean = false;
  export let success: Boolean = false;
  export let active: Boolean = true;

  $: classList = `generator__info 
  ${error ? "generator__info--error" : ""} 
  ${success ? "generator__info--success" : ""} 
  ${active ? "generator__info--active" : ""} 
  `;
</script>

<div class={classList}><slot /></div>

<style lang="scss">
  .generator__info {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
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
