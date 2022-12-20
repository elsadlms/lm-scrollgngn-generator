<script lang="ts">
  import { saveAs } from "file-saver";

  import { pagesData, blocksData, customCssData } from "../stores.js";

  import Info from "./Styled/Info.svelte";
  import Button from "./Styled/Button.svelte";

  let notificationActive = false;

  $: cleanCustomCss = () => {
    let cleanCss = $customCssData;
    cleanCss = cleanCss.replaceAll("<br>", " ");
    cleanCss = cleanCss.replaceAll("&nbsp;", " ");

    cleanCss = `<${""}style>${cleanCss}</${""}style>`;

    // besoin de casser la balise style pour une obcure erreur svelte
    // https://github.com/sveltejs/svelte/issues/5292

    return { content: cleanCss };
  };

  $: data = [...$pagesData].map((page) => {
    const { index, blockEdited, ...pageData } = { ...page };

    pageData.blocks = page.blocks.map((el) => {
      const { name, ...block } = $blocksData.find((block) => block.id === el);
      block.id = name;
      return block;
    });

    return pageData;
  });

  $: output = JSON.stringify([cleanCustomCss(), ...data], null, 4);

  const downloadOutput = () => {
    const file = new Blob([output], { type: "application/json" });
    saveAs(file, "scrllgngn.json");
  };

  const copyOutputToClipboard = () => {
    if (!output) return;
    if (!navigator.clipboard) return;

    console.log(output);

    navigator.clipboard.writeText(output);

    notificationActive = true;

    window.setTimeout(() => {
      notificationActive = false;
    }, 2000);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__snippet_wrapper">
  <div class="generator__snippet_buttons">
    <Button on:click={downloadOutput}>Exporter au format json</Button>

    <div class="generator__snippet_copy">
      <Button on:click={copyOutputToClipboard}>Copier le code</Button>
      <Info success active={notificationActive}>
        Le code a été copié dans le presse-papier !
      </Info>
    </div>
  </div>

  <div class="generator__snippet">
    <pre>{output}</pre>
  </div>
</div>

<style lang="scss">
  .generator__snippet {
    background-color: var(--gen-c-darkest);
    color: var(--gen-c-lightest);
    overflow-x: scroll;
    padding: 24px;
    border-radius: var(--gen-border-radius);

    &_buttons {
      display: flex;
    }
  }

  .generator__snippet_buttons {
    display: flex;
    column-gap: 1em;
    align-items: center;
    margin-bottom: 1em;
  }

  .generator__snippet_copy {
    display: flex;
    column-gap: 1em;
    align-items: center;
  }
</style>
