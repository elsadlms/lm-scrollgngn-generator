<script lang="ts">
  import type { BlockData, PageData } from "../types";
  import { blocksData, pagesData, error } from "../stores.js";

  export let page: PageData;

  let selectedBlock;

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

  // const updateBlock = (event) => {
  //   const updatedBlock = event.detail.block;

  //   pagesData.update((data) => {
  //     data.map((el) => {
  //       if (el.index === page.index) {
  //         el.blocks.splice(updatedBlock.index, 1, updatedBlock);
  //       }
  //     });
  //     return data;
  //   });
  // };

  $: availableBlocks = [...$blocksData].filter(
    (el) => !page.blocks.includes(el.id)
  );
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
    <p
      class="generator__form_input-text"
      on:keyup={updateData}
      bind:textContent={page.backgroundColor}
      contenteditable="true"
    />
  </div>

  <div class="generator__page_blocks">
    {#each page.blocks as block, index}
      <p>Bloc {block}</p>
      <p on:click={() => deleteBlock(index)}>x Supprimer</p>
    {/each}

    <div>
      <p>Nouveau bloc :</p>
      <select bind:value={selectedBlock}>
        {#each availableBlocks as block}
          <option value={block.id}>{block.id}</option>
        {/each}
      </select>
      <p on:click={addBlock}>Ajouter</p>
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

    h3 {
      padding-bottom: 12px;
    }
  }
</style>
