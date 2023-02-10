<script lang="ts">
  import type { BlockData } from "../../types";
  import BlockConstructor from "./BlockConstructor.svelte";
  import Label from "./../Styled/Label.svelte";

  export let block: BlockData;
  export let blockIsOpen: Boolean;
</script>

<div>
  <!-- btn supprimer -->
  <div class="generator__library-element_header">
    <slot name="delete-block" />

    <div class="generator__library-element_title">
      <Label>{block.type}</Label>
      <p>{block.name}</p>
    </div>

      <slot name="close-block" />
  </div>

  {#if blockIsOpen}
    <div class="generator__new-block">
      <BlockConstructor {block} />
    </div>
  {/if}
</div>

<style lang="scss">
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
</style>
