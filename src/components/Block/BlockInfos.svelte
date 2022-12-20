<script lang="ts">
  import type { BlockData } from "../../types";
  import { blocksData } from "../../stores";

  export let block: BlockData;

  let error = "";

  const updateBlockName = () => {
    const sameNameArray: BlockData[] = $blocksData.filter(
      (el) => el.name === block.name
    );

    if (sameNameArray.length > 1) {
      error = "Un bloc du même nom existe déjà !";
      console.log(error)
      console.log(nameClass)
    } else {
      error = "";
      updateBlock();
    }
  };

  const updateBlock = () => {
    blocksData.update((data) => data);
  };

  $: nameClass = `generator__page_block-name
  ${error ? 'generator__page_block-name--error' : ''}`
</script>

<div class="generator__page_block-infos">
  <p class="generator__page_block-label"><span>{block.type}</span></p>
  <p class={nameClass}>
    <span
      on:keyup={updateBlockName}
      bind:textContent={block.name}
      contenteditable="true"
    />
  </p>
</div>

<style lang="scss">
  .generator__page_block-infos {
    padding: 12px 0;

    p {
      display: inline-block;

      + p {
        padding-left: 0.5em;
        padding-top: 0.5em;
      }
    }
  }

  .generator__page_block-label {
    background-color: #c7d2fe;
    padding: 0.4em 1em 0.1em;
    border-radius: 1em;
    line-height: 1em;
    display: inline;
    font-weight: 500;
    font-size: 0.8em;
    line-height: 12px;

    span {
      opacity: 0.8;
    }
  }

  .generator__page_block-name {
    font-weight: 600;

    span:focus {
      font-family: monospace;
      line-height: 1em;
    }

    &--error {
      color: var(--gen-c-error);
    }
  }
</style>
