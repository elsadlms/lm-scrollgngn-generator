<script lang="ts">
  import Page from "./Page.svelte";
  import Block from "./Block.svelte";

  import type { BlockData } from "../types";
  import { pagesData, blocksData } from "../stores";
  import { defaultBlock } from "../models";

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
  <h2>Blocs</h2>
  <div class="generator__blocks">
    {#each $blocksData as block}
      <Block {block} />
    {/each}
  </div>
  <p on:click={addBlock}>Ajouter un bloc</p>

  <h2>Pages</h2>
  <div class="generator__pages">
    {#each $pagesData as page}
      <Page {page} />
    {/each}
  </div>
  <p on:click={addPage}>Ajouter une page</p>
</form>

<style>
  .generator__form {
    padding: 32px 0;
  }
</style>
