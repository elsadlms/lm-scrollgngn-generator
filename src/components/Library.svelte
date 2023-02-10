<script lang="ts">
  import { blocksData, pagesData } from "../stores";
  import type { BlockData } from "../types";
  import BlockConstructor from "./Block/BlockConstructor.svelte";

  import CloseIcon from "./Icons/CloseIcon.svelte";
  import SmallArrow from "./Icons/SmallArrow.svelte";
  import Label from "./Styled/Label.svelte";

  let deleteWarningOnBlock = "";

  const openBlock = (block: BlockData) => {
    if (deleteWarningOnBlock) return;
    openBlockId = block.id;
  };

  const closeBlock = () => {
    if (deleteWarningOnBlock) return;
    openBlockId = "";
  };

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

  $: openBlockId = "";
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__library">
  {#each $blocksData as block}
    <div
      class="generator__library_element 
      {block.id === openBlockId ? 'generator__library_element--is-open' : ''}"
    >
      <!-- <LibraryBlock blockIsOpen={block.id === openBlockId} {block}> -->

      <div
        class="generator__library-element_header"
        on:click={block.id === openBlockId ? closeBlock() : openBlock(block)}
      >
        <div
          class="generator__library_element_delete
          {deleteWarningOnBlock === block.id
            ? 'generator__library_element_delete-active'
            : ''}"
          on:click|stopPropagation={() => openWarningBeforeDelete(block)}
        >
          <CloseIcon
            fill={deleteWarningOnBlock === block.id
              ? "var(--gen-c-error)"
              : "var(--gen-c-darker)"}
          />
          {#if deleteWarningOnBlock === block.id}
            <div class="generator__library_element_delete-warning">
              <p>Supprimer ?</p>
              <p on:click|stopPropagation={() => deleteBlockFromLibrary(block)}>
                Oui
              </p>
              <p on:click|stopPropagation={closeWarningBeforeDelete}>Non</p>
            </div>
          {/if}
        </div>

        <div class="generator__library-element_title">
          <Label>{block.type}</Label>
          <p>{block.name}</p>
        </div>

        {#if block.id === openBlockId}
          <div
            class="generator__library_element_close"
            on:click|stopPropagation={closeBlock}
          >
            <SmallArrow direction="up" />
          </div>
        {/if}
      </div>

      {#if block.id === openBlockId}
        <div class="generator__new-block">
          <BlockConstructor {block} />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style global lang="scss">
  .generator__library {
    background-color: var(--gen-c-lightest);
    margin-top: 1em;
  }

  .generator__library_element {
    background-color: var(--gen-c-lighter);
    position: relative;

    + .generator__library_element {
      border-top: 1px solid var(--gen-c-lighter);
    }

    .generator__block {
      border-radius: 0 !important;
    }
  }

  .generator__library_element_delete {
    display: inline-block;
    cursor: pointer;
    padding: var(--gen-gutter);
    display: flex;
    column-gap: 1em;
    align-items: baseline;
    transition: transform 200ms;

    &:hover {
      transform: rotate(90deg);
    }
  }

  .generator__library_element_delete-warning {
    display: flex;
    column-gap: 1em;
    line-height: 0;
    animation: expand 600ms;
  }

  .generator__library_element_delete-active {
    background-color: var(--gen-c-error-light);
    transition: background-color 600ms;
    color: var(--gen-c-error);
    cursor: auto;

    p:not(:first-child) {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 0.06em;
        text-underline-offset: 0.2em;
      }
    }

    &:hover {
      transform: rotate(0deg);
    }
  }

  @keyframes expand {
    0% {
      width: 0;
      opacity: 0;
    }

    100% {
      width: 150px;
      opacity: 1;
    }
  }

  .generator__library_element_close {
    cursor: pointer;
    position: absolute;
    padding: var(--gen-gutter);
    right: 0;
  }

  .generator__library-element_header {
    display: flex;
    align-items: center;
    column-gap: 1em;
  }

  .generator__library-element_title {
    display: flex;
    column-gap: 0.6em;
    align-items: baseline;
  }

  .generator__library-element_title p {
    font-weight: 500;
  }

  .generator__library {
    margin-top: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 100vh;
    z-index: 10;
    overflow: scroll;
  }

  .generator__library_toggle {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
