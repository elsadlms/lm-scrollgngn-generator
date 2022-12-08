<script lang="ts">
  import Transition from "./Transition.svelte";

  import { typeOptions, depthOptions, layoutOptions } from "../options";

  import type { BlockData } from "../types";
  import { blocksData, pagesData } from "../stores";

  export let block: BlockData;

  let mobileTransitions = false;
  let mobileLayout = false;

  let optionsOpen = true;

  const deleteBlock = () => {
    const blockIndex = $blocksData.findIndex((el) => el.id === block.id);

    pagesData.update((data) => {
      data.map((page) => {
        if (page.blocks.includes(block.name)) {
          const indexToDelete = page.blocks.findIndex(
            (el) => el === block.name
          );
          page.blocks.splice(indexToDelete, 1);
        }
        return page;
      });
      return data;
    });

    blocksData.update((data) => {
      data.splice(blockIndex, 1);
      return data;
    });
  };

  const duplicateBlock = () => {
    let i = 2;
    let newID = `${block.name} (${i})`
    while ($blocksData.find(el => el.name === newID)) {
      i++
      newID = `${block.name} (${i})`
    }

    const newBlock: BlockData = {
      ...block,
      index: $blocksData.length,
      id: newID,
      name: newID,
    };

    blocksData.update((data) => {
      return [...data, newBlock];
    });
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

  const addTransition = (properties: {
    direction: string;
    mobile?: boolean;
  }) => {
    if (properties.mobile) {
      block.mobileTransitions.push([`${properties.direction}-fade`, 600]);
    } else {
      block.transitions.push([`${properties.direction}-fade`, 600]);
    }
    updateBlock();
  };

  const deleteTransition = (properties: {
    index: number;
    mobile?: boolean;
  }) => {
    if (properties.mobile) {
      block.mobileTransitions.splice(properties.index, 1);
    } else {
      block.transitions.splice(properties.index, 1);
    }
    updateBlock();
  };

  const toggleMobileTransitions = () => {
    mobileTransitions = !mobileTransitions;

    if (!mobileTransitions) {
      delete block.mobileTransitions;
    } else {
      block.mobileTransitions = [];
    }
  };

  const toggleMobileLayout = () => {
    mobileLayout = !mobileLayout;

    if (!mobileLayout) {
      delete block.mobileLayout;
    } else {
      block.mobileLayout = "default";
    }
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
  <p class="generator__form_button-delete" on:click={deleteBlock}>
    x Supprimer
  </p>

  <p class="generator__form_button-duplicate" on:click={duplicateBlock}>
    Dupliquer
  </p>

  <h3>
    Bloc
    <span
      on:keyup={updateBlock}
      bind:textContent={block.name}
      contenteditable="true"
    />
  </h3>

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
    <div class="generator__block_options">
      <p class="generator__form_label">Position</p>
      {#each depthOptions.filter( (el) => (block.type === "module" ? el != "scroll" : el) ) as option}
        <label>
          <input
            type="radio"
            name={`depth-${block.id}`}
            bind:group={block.depth}
            on:change={updateBlock}
            value={option}
          />
          {option}
        </label>
      {/each}

      <p class="generator__form_label">Layout</p>
      {#each layoutOptions as option}
        <label>
          <input
            type="radio"
            name={`layout-${block.id}`}
            bind:group={block.layout}
            on:change={updateBlock}
            value={option}
          />
          {option}
        </label>
      {/each}

      <div>
        <input
          name={`mobile-layout-check-${block.id}`}
          type="checkbox"
          on:input={toggleMobileLayout}
        />
        <label for={`mobile-layout-check-${block.id}`}
          >Layout différent sur mobile ?</label
        >
      </div>

      {#if mobileLayout}
        <p class="generator__form_label">Layout mobile</p>
        {#each layoutOptions as option}
          <label>
            <input
              type="radio"
              name={`mobile-layout-${block.id}`}
              bind:group={block.mobileLayout}
              on:change={updateBlock}
              value={option}
            />
            {option}
          </label>
        {/each}
      {/if}

      {#if block.depth != "scroll"}
        <div class="generator__flex">
          <p>z-index :</p>
          <input
            type="number"
            bind:value={block.zIndex}
            on:change={updateBlock}
          />
        </div>

        {#each ["in", "out"] as direction}
          <p class="generator__form_label">Transitions {direction}</p>

          {#each block.transitions as transition, index}
            {#if transition[0].startsWith(direction)}
              <Transition on:update={updateBlock} {transition} {direction} />
              <p on:click={() => deleteTransition({ index })}>X</p>
            {/if}
          {/each}

          <p on:click={() => addTransition({ direction })}>
            + Nouvelle transition {direction}
          </p>
        {/each}

        <div>
          <input
            name={`mobile-transitions-check-${block.id}`}
            type="checkbox"
            on:input={toggleMobileTransitions}
          />
          <label for={`mobile-transitions-check-${block.id}`}
            >Transitions différentes sur mobile ?</label
          >
        </div>

        {#if mobileTransitions}
          {#each ["in", "out"] as direction}
            <p class="generator__form_label">Transitions MOBILE {direction}</p>

            {#each block.mobileTransitions as transition, index}
              {#if transition[0].startsWith(direction)}
                <Transition on:update={updateBlock} {transition} {direction} />
                <p on:click={() => deleteTransition({ index, mobile: true })}>
                  X
                </p>
              {/if}
            {/each}

            <p on:click={() => addTransition({ direction, mobile: true })}>
              + Nouvelle transition {direction}
            </p>
          {/each}
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style global lang="scss">
  .generator__new-block,
  .generator__block {
    padding: 20px;
    border: 1px dashed #a6a9b1;
    background-color: rgba(255, 255, 255, 0.6);
    font-size: 0.9em;

    &:first-child {
      margin-left: 0;
    }
  }

  .generator__block_content {
    border: 1px solid var(--gen-dark-grey);
    border-radius: 4px;

    &--html {
      min-height: 100px;
    }
  }
</style>
