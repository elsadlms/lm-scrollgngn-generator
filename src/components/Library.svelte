<script lang="ts">
  import { blocksData, pagesData } from "../stores";
  import type { BlockData } from "../types";

  import LibraryBlock from "./Block/LibraryBlock.svelte";

  const openBlock = (block: BlockData) => {
    openBlockId = block.id;
  };

  let deleteWarningOnBlock = "";

  const openWarningBeforeDelete = (block: BlockData) => {
    deleteWarningOnBlock = block.id;
  };

  const closeWarningBeforeDelete = () => {
    deleteWarningOnBlock = "";
  };

  const deleteBlockFromLibrary = (block: BlockData) => {
    // on supprime le bloc dans les pages dans lesquelles il apparaissait
    // (todo / on pourrait ajouter un warning quand c'est le cas)
    pagesData.update((data) => {
      data.map((page) => {
        page.blocks.map((el, index) => {
          if (el === block.id) {
            page.blocks.splice(index, 1);
          }
        });
      });
      return data;
    });

    // puis on le supprime de la bibliothèque de blocs
    blocksData.update((data) => {
      const blockToDeleteIndex = data.findIndex((el) => el.id === block.id);
      data.splice(blockToDeleteIndex, 1);
      return data;
    });
  };

  $: openBlockId = "kz7p3ai148";

  $: bgColorOnHover = "var(--gen-c-lighter)";
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  style="--gen-c-library-hover: {bgColorOnHover};"
  class="generator__library"
>
  {#each $blocksData as block}
    <div
      class="generator__library_element 
      {block.id === openBlockId ? 'generator__library_element--is-open' : ''}"
      on:click={() => openBlock(block)}
    >
      <LibraryBlock blockIsOpen={block.id === openBlockId} {block}>
        <svelte:fragment slot="delete-block">
          <p
            class="generator__library_element_delete"
            on:mouseenter={() => (bgColorOnHover = "var(--gen-c-error-light)")}
            on:mouseout={() => (bgColorOnHover = "var(--gen-c-lighter)")}
            on:click|stopPropagation={() => openWarningBeforeDelete(block)}
          >
            x
          </p>
          {#if deleteWarningOnBlock === block.id}
            <p on:click|stopPropagation>sûr???</p>
            <p on:click|stopPropagation={() => deleteBlockFromLibrary(block)}>
              oui
            </p>
            <p on:click|stopPropagation={closeWarningBeforeDelete}>no</p>
          {/if}
        </svelte:fragment>
        <svelte:fragment slot="close-block">
          {#if block.id === openBlockId}
            <p on:click|stopPropagation={() => (openBlockId = "")}>
              On range!!!
            </p>
          {/if}
        </svelte:fragment>
      </LibraryBlock>
    </div>
  {/each}
</div>

<style global lang="scss">
  .generator__library {
    background-color: var(--gen-c-lightest);
    margin-top: 1em;
  }

  .generator__library_element {
    transition: background-color 200ms;

    + .generator__library_element {
      border-top: 1px solid var(--gen-c-lighter);
    }

    // &:not(.generator__library_element--is-open):hover {
    &:hover {
      background-color: var(--gen-c-library-hover);

      .generator__block {
        background-color: var(--gen-c-library-hover) !important;
      }
    }

    position: relative;
  }

  .generator__library_element_delete {
    display: inline-block;
    cursor: pointer;
    padding: var(--gen-gutter);

    &:hover {
      color: var(--gen-c-error);
    }
  }
</style>
