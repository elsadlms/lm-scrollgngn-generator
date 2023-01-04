<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { PageData } from "../types";
  import { blocksData, pagesData } from "../stores";

  import BlockInfos from "./Block/BlockInfos.svelte";
  import Button from "./Styled/Button.svelte";
  import PageContent from "./PageContent.svelte";

  export let page: PageData;

  const dispatch = createEventDispatcher();

  let selectedBlock: string | null = null;

  const deletePage = () => {
    pagesData.update((data) => {
      data.splice(page.index, 1);
      data.map((el, i) => (el.index = i));
      return data;
    });
  };

  const updateData = () => {
    pagesData.update((data) => data);
  };

  const addBlock = () => {
    pagesData.update((data) => {
      data.map((el) => {
        if (el.index === page.index) {
          el.blocks = [...el.blocks, selectedBlock];
        }
      });
      return data;
    });
    selectedBlock = null;
  };

  const editBlock = (block: string) => {
    // on ferme tous les blocs en cours d'édition
    pagesData.update((data) => {
      data.map((page) => (page.blockEdited = null));
      return data;
    });

    // on ouvre l'édition du bloc sélectionné
    page.blockEdited = block;
    pagesData.update((data) => data);
  };

  const duplicateBlock = (block: string) => {
    dispatch("duplicate", { block });
  };

  const deleteBlockFromPage = (index: number) => {
    pagesData.update((data) => {
      data.map((el) => {
        if (el.index === page.index) {
          el.blocks.splice(index, 1);
        }
      });
      return data;
    });
  };

  $: availableBlocks = [...$blocksData].filter(
    (el) => !page.blocks.includes(el.id) && el.id != page.blockEdited
  );
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__page">
  <p
    class="generator__form_button generator__form_button--uppercase"
    on:click={deletePage}
  >
    x Supprimer la page {page.index + 1}
  </p>

  <h3>Page {page.index + 1}</h3>

  <div class="generator__form_group generator__flex">
    <p class="generator__form_label">Couleur de fond</p>
    <input
      class="generator__form_input-color"
      type="color"
      on:change={updateData}
      bind:value={page.bgColor}
    />
  </div>

  <PageContent page={page} />

  <div class="generator__form_group">
    <p class="generator__form_label generator__form_label--header">Blocs</p>

    <div class="generator__page_blocks">
      {#each page.blocks as block, index}
        <div class="generator__page_block">
          <p
            class="generator__form_button generator__form_button--uppercase"
            on:click={() => deleteBlockFromPage(index)}
          >
            x Supprimer
          </p>
          <BlockInfos block={$blocksData.find((el) => el.id === block)} />
          <p
            class="generator__form_button generator__form_button--uppercase"
            on:click={() => editBlock(block)}
          >
            > Éditer
          </p>
          <br />
          <p
            class="generator__form_button generator__form_button--uppercase"
            on:click={() => duplicateBlock(block)}
          >
            = Dupliquer
          </p>
        </div>
      {/each}

      {#if page.blocks.length === 0}
        <p class="generator__disabled">Aucun bloc sur cette page.</p>
      {/if}
    </div>
  </div>

  <!-- nouveau bloc -->
  <slot name="new-block" />

  <div class="generator__page_add-block">
    <p>Ou ajouter un bloc existant :</p>
    {#if availableBlocks.length > 0}
      <div>
        <select bind:value={selectedBlock}>
          {#each availableBlocks as block}
            <option value={block.id}>{block.name}</option>
          {/each}
        </select>
        <div class={selectedBlock ? "" : "generator__disabled"}>
          <Button on:click={addBlock}>Valider</Button>
        </div>
      </div>
    {:else}
      <p class="generator__disabled">
        Cette page contient déjà tous les blocs existants.
      </p>
    {/if}
  </div>
</div>

<style lang="scss">
  .generator__page {
    padding: 32px;
    background-color: var(--gen-c-lightest);
    border-radius: var(--gen-border-radius);

    &:not(:first-child) {
      margin-top: 20px;
    }

    h3 {
      padding: 12px 0;
    }
  }

  .generator__page_add-block {
    padding-top: 32px;

    p:first-child {
      margin-bottom: 12px;
      font-weight: 500;
    }

    > div {
      display: flex;
      align-items: center;
      column-gap: 1em;
    }

    select {
      align-self: stretch;
    }
  }

  .generator__page_blocks {
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--gen-gutter);
  }

  .generator__page_block {
    background-color: var(--gen-c-lighter);
    padding: var(--gen-gutter);
    border-radius: var(--gen-border-radius);
  }

  .generator__page_block p:first-child {
    display: block;
  }
</style>
