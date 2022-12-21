<script lang="ts">
  import { customCssData } from "../stores";

  $: customCss = $customCssData;

  const updateCss = () => {
    customCssData.update(() => customCss);
  };
</script>

<div class="generator__custom-css">
  <p
    class="generator__custom-css_content generator__contenteditable"
    on:keyup={updateCss}
    bind:innerHTML={customCss}
    contenteditable="true"
  />
</div>

<style lang="scss">
  .generator__custom-css {
    margin-top: var(--gen-gutter);
    border-top: 1px dashed var(--gen-c-light);

    &_content {
      background-color: var(--gen-c-lightest);
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      margin-top: var(--gen-gutter);
    }
  }
</style>
