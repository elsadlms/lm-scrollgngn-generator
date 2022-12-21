<script lang="ts">
  import type { BlockData } from "../../types";
  import { blocksData, error } from "../../stores";
  import { typeOptions } from "../../options";

  import Info from "../Styled/Info.svelte";
  import BlockOptions from "./BlockOptions.svelte";

  export let block: BlockData;

  let optionsOpen = true;

  const updateBlockName = () => {
    const sameNameArray: BlockData[] = $blocksData.filter(
      (el) => el.name === block.name
    );

    if (sameNameArray.length > 1) {
      error.update((stored) => {
        return { ...stored, duplicate: "Un bloc du même nom existe déjà !" };
      });
    } else {
      error.update((stored) => {
        return { ...stored, duplicate: "" };
      });
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

  $: inputContentClass = `generator__block_content generator__contenteditable ${
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
  {#if $error.duplicate}
    <Info marginBottom={20} error>{$error.duplicate}</Info>
  {/if}

  <h3>
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

  <div class="generator__form_group generator__flex">
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

  <div class="generator__form_group">
    <p class="generator__form_label">
      {block.type === "module" ? "URL" : "Contenu"}
    </p>
    <p
      class={inputContentClass}
      on:keyup={updateBlock}
      bind:textContent={block.content}
      contenteditable="true"
    />
  </div>

  <div class="generator__form_group">
    <!-- <h4 class={optionsToggleClass} on:click={toggleOptions}>Options</h4> -->
    {#if optionsOpen}
      <BlockOptions {block} />
    {/if}
  </div>
</div>

<style lang="scss">
  .generator__block {
    padding: 20px;
    border-radius: var(--gen-border-radius);
    transition: background-color 200ms;
    margin: 0 20px 20px 20px;
    background-color: var(--gen-c-lighter);

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }

    h3 {
      margin-bottom: 20px;

      span {
        background-color: var(--gen-c-lightest);
        padding: 0.4em 0.6em 0.2em;
        font-family: monospace;
      }
    }
  }

  .generator__block_content {
    margin-top: 6px;
    padding: 12px;
    border-radius: 4px;
    background-color: var(--gen-c-lightest);
    border: 1px dashed var(--gen-c-neutral);
    font-family: monospace;
    width: 100%;
    max-width: 100%;

    &--html {
      min-height: 100px;
    }
  }
</style>
