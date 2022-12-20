<script lang="ts">
  import Page from "./Page.svelte";
  import Block from "./Block/BlockConstructor.svelte";
  import Button from "./Styled/Button.svelte";

  import type { BlockData } from "../types";
  import { pagesData, blocksData } from "../stores";
  import { defaultBlock, defaultPage } from "../models";
  import { getRandomId } from "../utils";

  const createNewPage = () => {
    const newPage = {
      index: $pagesData.length,
      ...defaultPage
    };
    pagesData.update((data) => [...data, newPage]);
  };

  const duplicateBlock = (blockID: string) => {
    const blockToDuplicate = $blocksData.find((el) => el.id === blockID);

    let i = 2;
    let newID = `${blockToDuplicate.name} (${i})`;

    while ($blocksData.find((el) => el.name === newID)) {
      i++;
      newID = `${blockToDuplicate.name} (${i})`;
    }

    const duplicate = {
      ...blockToDuplicate,
      name: newID
    };

    return duplicate;
  };

  const editBlock = ({ blockID, page }) => {
    const randomID = getRandomId();
    let newBlock: BlockData;

    if (!blockID) {
      newBlock = {
        id: randomID,
        name: randomID,
        ...defaultBlock
      };
    } else {
      newBlock = {
        ...duplicateBlock(blockID),
        id: randomID
      };
    }

    page.blockEdited = randomID;

    blocksData.update((data) => {
      return [...data, newBlock];
    });
  };

  const addBlockToPage = (page) => {
    pagesData.update((data) => {
      data.map((el) => {
        if (el.index === page.index) {
          if (!el.blocks.includes(page.blockEdited)) {
            el.blocks = [...el.blocks, page.blockEdited];
          }
        }
      });
      return data;
    });

    page.blockEdited = null;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="generator__form">
  <div class="generator__pages">
    {#each $pagesData as page}
      <Page
        on:duplicate={(e) => editBlock({ blockID: e.detail.block, page })}
        {page}
      />

      {#if !page.blockEdited}
        <Button on:click={() => editBlock({ blockID: null, page })}>Nouveau bloc</Button>
      {:else}
        <div class="generator__new-block-2">
          <Block
            block={$blocksData.find((block) => block.id === page.blockEdited)}
          />
          {#if !page.blocks.includes(page.blockEdited)}
            <Button on:click={() => addBlockToPage(page)}>
              Ajouter le bloc à la page
            </Button>
          {:else}
            <Button on:click={() => (page.blockEdited = null)}>Valider</Button>
          {/if}
        </div>
      {/if}
    {/each}
  </div>

  <Button on:click={createNewPage}>+ Ajouter une page</Button>
</form>

<style lang="scss">
  .generator__form {
    padding-bottom: 64px;
  }

  .generator__blocks {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;

    @media screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1000px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .generator__new-block {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    cursor: pointer;

    p {
      font-size: 0.9em;
      color: #475569;
      transition: color 200ms;
    }
  }

  @media (hover: hover) {
    .generator__new-block:hover {
      p {
        color: #94a3b8;
      }
    }
  }

  .generator__pages {
    margin-bottom: 1em;
  }
</style>
