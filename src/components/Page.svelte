<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { PageData } from "../types";
  import { blocksData, pagesData } from "../stores.js";

  import BlockInfos from "./Block/BlockInfos.svelte";
  import Button from "./Styled/Button.svelte";

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
    page.blockEdited = block;
    pagesData.update((data) => data);
  };

  const duplicateBlock = (block: string) => {
    dispatch("duplicate", { block });
  };

  const deleteBlock = (index: number) => {
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

  <div class="generator__flex">
    <p class="generator__form_label">Couleur de fond</p>
    <input
      class="generator__form_input-color"
      type="color"
      on:change={updateData}
      bind:value={page.backgroundColor}
    />
  </div>

  <div class="generator__form_group">
    <p class="generator__form_label">Contenu</p>
    <p
      class="generator__page_content generator__contenteditable"
      on:keyup={updateData}
      bind:textContent={page.content}
      contenteditable="true"
    />
  </div>

  <div class="generator__page_blocks">
    {#each page.blocks as block, index}
      <div class="generator__page_block">
        <p
          class="generator__form_button generator__form_button--uppercase"
          on:click={() => deleteBlock(index)}
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

  <!-- nouveau bloc -->
  <slot />

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
    }

    > div {
      display: flex;
      align-items: center;
      column-gap: 1em;
    }

    select {
      align-self: stretch;
    }

    .generator__text--disabled {
      padding-top: 12px;
    }
  }

  .generator__page_content {
    margin-top: 6px;
    padding: 12px;
    border-radius: 4px;
    background-color: var(--gen-c-white);
    border: 1px dashed var(--gen-c-neutral);
    font-family: monospace;
    width: 100%;
    max-width: 100%;
  }

  .generator__page_blocks {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--gen-gutter);
  }

  .generator__page_block {
    background-color: var(--gen-c-lighter);
    padding: var(--gen-gutter);
    border-radius: var(--gen-border-radius);

    p:first-child {
      display: block;
    }
  }
</style>
