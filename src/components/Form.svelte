<script lang="ts">
  import Page from "./Page.svelte";
  import Block from "./Block.svelte";

  import type { BlockData } from "../types";
  import { pagesData, blocksData } from "../stores";
  import { defaultBlock, defaultPage } from "../models";

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
      ...defaultPage
    };
    pagesData.update((data) => [...data, newPage]);
  };

  const addBlock = () => {
    const randomID = Math.random().toString(36).slice(2)

    const newBlock: BlockData = {
      index: $blocksData.length,
      id: randomID,
      name: randomID,
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
      <div class="generator__new-block" on:click={addBlock}><p>+ Ajouter un bloc</p></div>
    </div>
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
    }
  }
</style>
