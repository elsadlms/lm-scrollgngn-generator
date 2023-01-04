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
    <slot name="close-block" />

    <Label>{block.type}</Label>
    <p class="generator__library-element_title">{block.name}</p>
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
    font-weight: 500;
  }
</style>
