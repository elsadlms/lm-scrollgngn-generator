<script lang="ts">
  import type { BlockData } from "../../types";
  import { blocksData } from "../../stores";

  import Label from "./../Styled/Label.svelte";

  export let block: BlockData;

  let error = "";

  const updateBlockName = () => {
    const sameNameArray: BlockData[] = $blocksData.filter(
      (el) => el.name === block.name
    );

    if (sameNameArray.length > 1) {
      error = "Un bloc du même nom existe déjà !";
    } else {
      error = "";
      updateBlock();
    }
  };

  const updateBlock = () => {
    blocksData.update((data) => data);
  };

  $: nameClass = `generator__page_block-name
  ${error ? "generator__page_block-name--error" : ""}`;
</script>

<div class="generator__page_block-infos">
  <Label>{block.type}</Label>

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
