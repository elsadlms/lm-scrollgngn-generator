<script lang="ts">
  import SettingsForm from "./SettingsForm.svelte";
  import CustomCSS from "./CustomCSS.svelte";
  import Page from "./Page.svelte";
  import BlockConstructor from "./Block/BlockConstructor.svelte";
  import Button from "./Styled/Button.svelte";

  import type { BlockData } from "../types";
  import { pagesData, blocksData, errors } from "../stores";
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
    let newID = `${blockToDuplicate.name}-${i}`;

    while ($blocksData.find((el) => el.name === newID)) {
      i++;
      newID = `${blockToDuplicate.name}-${i}`;
    }

    const duplicate = {
      ...blockToDuplicate,
      name: newID
    };

    return duplicate;
  };

  const editNewBlock = ({ blockID, page }) => {
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

  const forgetBlock = (page) => {
    blocksData.update((data) => {
      const blockToDeleteIndex = data.findIndex(
        (block) => block.id === page.blockEdited
      );
      data.splice(blockToDeleteIndex, 1);
      return data;
    });

    page.blockEdited = null;
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

  $: hasError = $errors.filter((error) => error.active).length > 0;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="generator__form">
  <div class="generator__form_general">
    <p class="generator__form_label">Réglages généraux</p>
    <div class="generator__form_group">
      <SettingsForm />
      <CustomCSS />
    </div>
  </div>

  <div class="generator__pages">
    {#each $pagesData as page}
      <Page
        on:duplicate={(e) => editNewBlock({ blockID: e.detail.block, page })}
        {page}
      >
        <div slot="new-block">
          {#if !page.blockEdited}
            <Button on:click={() => editNewBlock({ blockID: null, page })}
              >+ Nouveau bloc</Button
            >
          {:else}
            <div class="generator__new-block">
              <BlockConstructor
                block={$blocksData.find(
                  (block) => block.id === page.blockEdited
                )}
              />
              {#if !page.blocks.includes(page.blockEdited)}
                <div class="generator__buttons-group">
                  <Button
                    disabled={hasError}
                    on:click={() => addBlockToPage(page)}
                  >
                    Ajouter le bloc à la page
                  </Button>
                  <Button on:click={() => forgetBlock(page)}>Annuler</Button>
                </div>
              {:else}
                <Button
                  disabled={hasError}
                  on:click={() => (page.blockEdited = null)}
                >
                  Valider
                </Button>
              {/if}
            </div>
          {/if}
        </div>
      </Page>
    {/each}
  </div>

  <Button on:click={createNewPage}>+ Ajouter une page</Button>
</form>

<style lang="scss">
  .generator__form {
    margin-top: 32px;
    padding-bottom: 64px;
  }

  .generator__form_general {
    border: 1px dashed var(--gen-c-neutral);
    padding: var(--gen-gutter);
    margin-bottom: 32px;
  }

  .generator__pages {
    margin-bottom: 1em;
  }
</style>
