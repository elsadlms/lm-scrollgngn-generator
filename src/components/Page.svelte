<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { PageData } from "../types";
  import { blocksData, pagesData } from "../stores.js";

  import BlockInfos from "./Block/BlockInfos.svelte";

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

  $: addBlockClass = `generator__page_add-block ${
    availableBlocks.length === 0 ? `generator__page_add-block--disabled` : ``
  }`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__page">
  <p
    class="generator__form_button generator__form_button-delete"
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

  <div class="generator__page_blocks">
    <p><b>Blocs</b></p>
    <p>–––––––––––––––––––––––</p>
    {#each page.blocks as block, index}
      <p>Bloc {$blocksData.find((el) => el.id === block).name}</p>
      <BlockInfos block={$blocksData.find((el) => el.id === block)} />
      <p on:click={() => deleteBlock(index)}>x Supprimer</p>
      <p on:click={() => editBlock(block)}>> Éditer</p>
      <p on:click={() => duplicateBlock(block)}>= Dupliquer</p>
      <p>–––––––––––––––––––––––</p>
    {/each}

    <div class={addBlockClass}>
      <p>Ajouter un bloc existant</p>
      {#if availableBlocks.length > 0}
        <select bind:value={selectedBlock}>
          {#each availableBlocks as block}
            <option value={block.id}>{block.name}</option>
          {/each}
        </select>
        {#if selectedBlock}
          <p on:click={addBlock}>Ajouter</p>
        {/if}
      {:else}
        <p>Cette page contient déjà tous les blocs existants.</p>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .generator__page {
    padding: 20px;
    background-color: #f1f5f9;
    border-radius: 6px;

    &:not(:first-child) {
      margin-top: 20px;
    }

    h3 {
      padding-bottom: 12px;
    }
  }

  .generator__page_add-block--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
