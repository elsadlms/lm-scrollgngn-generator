<script lang="ts">
  import { readFile } from "../utils";
  import { customCssData } from "../stores";

  let files: FileList;

  $: if (files) readFile(files[0], loadCss)

  const loadCss = (loaded) => {
    customCssData.set(loaded);
  }

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
  <div class="generator__form_group">
    <label for="loadedCss">
      <p class="generator__form_button generator__form_button--uppercase">Importer une feuille de style</p>
    </label>
    <input bind:files id="loadedCss" name="loadedCss" type="file" />
  </div>
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
