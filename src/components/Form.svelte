<script lang="ts">
  import Page from "./Page.svelte";
  import Block from "./Block.svelte";

  import type { BlockData } from "../types";
  import { pagesData, blocksData } from "../stores";
  import { defaultBlock } from "../models";

  let blocksOpen = true;
  let pagesOpen = true;

  $: blocksToggleClass = `generator__toggle ${
    blocksOpen ? "generator__toggle--open" : ""
  }`;

  $: pagesToggleClass = `generator__toggle ${
    pagesOpen ? "generator__toggle--open" : ""
  }`;

  const toggleBlocks = () => {
    blocksOpen = !blocksOpen;
  };

  const togglePages = () => {
    pagesOpen = !pagesOpen;
  };

  const addPage = () => {
    const newPage = {
      index: $pagesData.length,
      backgroundColor: "#fff",
      blocks: []
    };
    pagesData.update((data) => [...data, newPage]);
  };

  const addBlock = () => {
    const newBlock: BlockData = {
      index: $blocksData.length,
      id: Date.now(),
      ...defaultBlock
    };

    blocksData.update((data) => {
      return [...data, newBlock];
    });
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="generator__form">
  <h2 class={blocksToggleClass} on:click={toggleBlocks}>Blocs</h2>
  {#if blocksOpen}
    <div class="generator__blocks">
      {#each $blocksData as block}
        <Block {block} />
      {/each}
    </div>
    <p on:click={addBlock}>Ajouter un bloc</p>
  {/if}

  <h2 class={pagesToggleClass} on:click={togglePages}>Pages</h2>
  {#if pagesOpen}
    <div class="generator__pages">
      {#each $pagesData as page}
        <Page {page} />
      {/each}
    </div>
    <p on:click={addPage}>Ajouter une page</p>
  {/if}
</form>

<style>
  .generator__form {
    padding: 32px 0;
  }
</style>
