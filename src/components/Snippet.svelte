<script lang="ts">
  import { saveAs } from "file-saver";

  import {
    pagesData,
    blocksData,
    customCssData,
    settingsData
  } from "../stores.js";

  import Info from "./Styled/Info.svelte";
  import Button from "./Styled/Button.svelte";

  let notificationActive = false;

  $: cleanCustomCss = () => {
    let cleanCss = $customCssData;
    cleanCss = cleanCss.replaceAll("<br>", " ");
    cleanCss = cleanCss.replaceAll("&nbsp;", " ");

    // besoin de casser la balise style pour une obscure erreur svelte
    // https://github.com/sveltejs/svelte/issues/5292

    cleanCss = `<${""}style>${cleanCss}</${""}style>`;

    return { blocks: [{ content: cleanCss }] };
  };

  $: pagesArray = [...$pagesData].map((page) => {
    const {
      index,
      blockEdited,
      content,
      contentType,
      contentLayout,
      contentMobileLayout,
      ...pageData
    } = { ...page };

    const contentBlock = {
      depth: "scroll",
      type: contentType,
      layout: contentLayout,
      mobileLayout: contentMobileLayout ?? contentLayout,
      content: content
    };

    pageData.blocks = page.blocks.map((el) => {
      const { name, ...block } = $blocksData.find((block) => block.id === el);
      block.id = name;
      return block;
    });

    pageData.blocks = [contentBlock, ...pageData.blocks];

    return pageData;
  });

  $: data = {
    ...$settingsData,
    pages: [cleanCustomCss(), ...pagesArray]
  };

  $: output = JSON.stringify(data, null, 4);
  $: localStorage.setItem("data", output);
  $: output, sendDataToServer();

  const sendDataToServer = async () => {
    console.log("send new data!");
    console.log(output);

    fetch("http://localhost:3000/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: output
    }).catch((error) => {
      console.error("error!", error);
    });
  };

  const openPreview = () => {
    console.log("preview!");
  };

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
  <div class="generator__buttons-group">
    <Button on:click={openPreview}>Prévisualiser</Button>

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
    margin-top: 1em;

    &_buttons {
      display: flex;
    }
  }

  .generator__snippet_copy {
    display: flex;
    column-gap: 1em;
    align-items: center;
  }
</style>
