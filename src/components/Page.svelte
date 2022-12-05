<script lang="ts">
  import type { BlockData, PageData } from "../types";
  import { pagesData } from "../stores.js";
  import { defaultBlock } from "../models.js";

  import Block from "./Block.svelte";

  export let page: PageData;

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
    const newBlock: BlockData = {
      index: page.blocks.length,
      ...defaultBlock
    };

    pagesData.update((data) => {
      data.map((el) => {
        if (el.index === page.index) {
          el.blocks = [...el.blocks, newBlock];
        }
      });
      return data;
    });
  };

  const deleteBlock = (event) => {
    const index = event.detail.block.index;

    pagesData.update((data) => {
      data.map((el) => {
        if (el.index === page.index) {
          el.blocks.splice(index, 1);
          el.blocks.map((block, i) => (block.index = i));
        }
      });
      return data;
    });
  };

  const updateBlock = (event) => {
    const updatedBlock = event.detail.block;

    pagesData.update((data) => {
      data.map((el) => {
        if (el.index === page.index) {
          el.blocks.splice(updatedBlock.index, 1, updatedBlock);
        }
      });
      return data;
    });
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__page">
  <p
    class="generator__form_button generator__form_button-delete"
    on:click={deletePage}
  >
    x Supprimer la page {page.index + 1}
  </p>

  <h2>Page {page.index + 1}</h2>

  <div class="generator__flex">
    <p class="generator__form_label">Couleur de fond</p>
    <p
      class="generator__form_input-text"
      on:keyup={updateData}
      bind:textContent={page.backgroundColor}
      contenteditable="true"
    />
  </div>

  <div class="generator__page_blocks">
    {#each page.blocks as block}
      <Block {block} on:delete={deleteBlock} on:update={updateBlock} />
    {/each}
    <div class="generator__new-block" on:click={addBlock}>
      <p>Nouveau bloc</p>
    </div>
  </div>
</div>

<style lang="scss">
  .generator__page {
    padding: 20px;
    background-color: #eff3fe;
    border-radius: 6px;

    &:not(:first-child) {
      margin-top: 20px;
    }

    h2 {
      padding-bottom: 12px;
    }
  }

  .generator__page_blocks {
    padding-top: 12px;
    display: flex;
    align-items: flex-start;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .generator__new-block {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.8em;

    p::before {
      content: "+";
      display: block;
      font-size: 2em;
    }
  }
</style>
