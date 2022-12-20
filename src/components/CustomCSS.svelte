<script lang="ts">
  import { customCssData } from "../stores";

  $: customCss = $customCssData;

  const updateCss = () => {
    console.log(customCss.replaceAll("<br>", "\n"));
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
    &_content {
      background-color: var(--gen-c-lightest);
      width: 100%;
      overflow: hidden;
      margin-bottom: 20px;
    }
  }
</style>
