<script lang="ts">
  import type { BlockData } from "../../types";

  export let block: BlockData;

  console.log(block);
</script>

<div class="generator__page_block-infos">
  <p class="generator__page_block-label">{block.type}</p>
  <pre>{block.content}</pre>
</div>

<style>
  .generator__page_block-infos {
    padding: 24px 0;
  }

  .generator__page_block-label {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.5em 1em;
    border-radius: 1em;
    line-height: 1em;
    display: inline-block;
    font-weight: 500;
    margin-bottom: 0.5em;
    font-size: 0.8em;
  }
</style>
