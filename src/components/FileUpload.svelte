<script lang="ts">
  import { getRandomId } from "../utils";
  import blocksLibrary from "./../library";

  import {
    settingsData,
    pagesData,
    blocksData,
    customCssData,
    uploadId
  } from "../stores";
  import type { BlockData, PageData } from "../types";

  import Button from "./Styled/Button.svelte";

  let files: FileList;

  $: if (files) {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      let result = JSON.parse(reader.result as string);
      console.log("loaded!");
      loadData(result);
    });

    if (files[0]) {
      reader.readAsText(files[0]);
    }
  }

  const loadData = (loaded) => {
    console.log(loaded);

    // on remplace le contenu du store par les données qu'on vient de charger

    // settingsData
    settingsData.set({
      bgColorTransitionDuration: loaded.bgColorTransitionDuration,
      thresholdOffset: loaded.thresholdOffset
    });

    // customCssData
    const styleTagsRegex = /<style>([\s\S]*?)<\/style>/g;
    const loadedCustomCss = loaded.pages[0].blocks[0].content;
    const cleanCustomCss = loadedCustomCss.replace(styleTagsRegex, "$1");
    customCssData.set(cleanCustomCss);

    // pagesData
    const cleanPages: PageData[] = [];
    const uniqueBlocks: BlockData[] = [];

    loaded.pages.map((page, i) => {
      if (i === 0) return;

      const cleanPage: PageData = {};

      cleanPage.index = i - 1;
      cleanPage.blockEdited = null;
      cleanPage.bgColor = page.bgColor;

      const contentBlock = page.blocks[0];
      cleanPage.content = contentBlock.content;
      cleanPage.contentType = contentBlock.type;
      cleanPage.contentLayout = contentBlock.layout;
      cleanPage.contentMobileLayout = contentBlock.mobileLayout;

      cleanPage.blocks = [];

      const fixedBlocks = page.blocks.filter(
        (block) => block.depth != "scroll"
      );

      for (const block of fixedBlocks) {
        if (!uniqueBlocks.find((el) => el.id === block.id)) {
          uniqueBlocks.push(block);
        }
        cleanPage.blocks.push(block.id);
      }

      console.log(cleanPage);
      console.log(uniqueBlocks);

      cleanPages.push(cleanPage);
    });

    pagesData.set(cleanPages);

    // blocksData
    const cleanBlocks: BlockData[] = [...(blocksLibrary as BlockData[])];
    uniqueBlocks.map((block) => {
      const cleanBlock: BlockData = { ...block };
      cleanBlock.name = block.id;
      cleanBlocks.push(cleanBlock);
    });

    blocksData.set(cleanBlocks);

    console.log("cleanBlocks");
    console.log(cleanBlocks);

    // on change l'id pour provoquer le rerender du formulaire avec les bonnes valeurs
    uploadId.set(getRandomId());
  };
</script>

<div class="generator__form_group">
  <label for="loadedData">
    <Button>Reprendre l'édition à partir d'un fichier json</Button>
  </label>
  <input bind:files id="loadedData" name="loadedData" type="file" />
</div>
