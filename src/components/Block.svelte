<script lang="ts">
  import type { BlockData } from "../types";
  import { blocksData } from "../stores";
  import { typeOptions } from "../options";
  
  import Info from "./Styled/Info.svelte";
  import BlockOptions from "./Block/BlockOptions.svelte";

  export let block: BlockData;

  let error = "";

  let optionsOpen = true;

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

  const updateBlockType = () => {
    if (block.type === "module" && block.depth === "scroll") {
      block.depth = "back";
    }
    updateBlock();
  };

  const updateBlock = () => {
    blocksData.update((data) => data);
  };

  const toggleOptions = () => {
    optionsOpen = !optionsOpen;
  };

  $: inputContentClass = `generator__block_content ${
    block.type === "html"
      ? "generator__block_content--html"
      : "generator__block_content--module"
  }`;

  $: optionsToggleClass = `generator__toggle ${
    optionsOpen ? "generator__toggle--open" : ""
  }`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__block">
  {#if error}
    <Info error>{error}</Info>
  {/if}

  <h3>
    Bloc
    <span
      on:keyup={updateBlockName}
      bind:textContent={block.name}
      contenteditable="true"
    />
  </h3>

  <!-- <p>Dupliquer un bloc existant ?</p>
  <select bind:value={block}>
    {#each $blocksData as el}
      {#if el.id != block.id}
        <option value={el}>{el.name}</option>
      {/if}
    {/each}
  </select> -->

  <div class="generator__flex">
    <p class="generator__form_label">Type</p>
    {#each typeOptions as option}
      <label>
        <input
          type="radio"
          name={`type-${block.id}`}
          bind:group={block.type}
          on:change={updateBlockType}
          value={option}
        />
        {option}
      </label>
    {/each}
  </div>

  <p class="generator__form_label">Contenu</p>
  <p
    class={inputContentClass}
    on:keyup={updateBlock}
    bind:textContent={block.content}
    contenteditable="true"
  />

  <h4 class={optionsToggleClass} on:click={toggleOptions}>Options</h4>
  {#if optionsOpen}
    <BlockOptions {block} />
  {/if}
</div>

<style global lang="scss">
  .generator__new-block,
  .generator__block {
    padding: 20px;
    border: 1px dashed #94a3b8;
    border-radius: 6px;
    font-size: 0.9em;
    transition: background-color 200ms;

    &:first-child {
      margin-left: 0;
    }
  }

  @media (hover: hover) {
    .generator__new-block:hover {
      background-color: #f8fafc;
    }
  }

  .generator__block_content {
    border: 1px dashed #cbd5e1;
    padding: 12px;
    border-radius: 4px;

    &--html {
      min-height: 100px;
    }
  }
</style>
