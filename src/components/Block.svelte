<script lang="ts">
  import Transition from "./Transition.svelte";

  import type { BlockData } from "../types";
  import { blocksData } from "../stores";

  export let block: BlockData;

  let mobileTransitions = false;
  let mobileLayout = false;

  let optionsOpen = true;

  const deleteBlock = () => {
    blocksData.update((data) => {
      data.splice(block.index, 1);
      data.map((el, i) => (el.index = i));
      return data;
    });
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

  <h3>Bloc {block.index + 1}</h3>

  <p class="generator__form_label">Id</p>
  <p
    on:keyup={updateBlock}
    bind:textContent={block.id}
    contenteditable="true"
  />

  <div class="generator__flex">
    <p class="generator__form_label">Type</p>
    <select bind:value={block.type} on:change={updateBlock}>
      <option value="html">Bloc html</option>
      <option value="module">Module</option>
    </select>
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
      <select bind:value={block.depth} on:change={updateBlock}>
        <option value="scroll">Scroll</option>
        <option value="front">Front</option>
        <option value="back">Back</option>
      </select>

      <p class="generator__form_label">Layout</p>
      <select bind:value={block.layout} on:change={updateBlock}>
        <option value="default">Par défaut</option>
        <option value="left-half">Moitié gauche</option>
        <option value="right-half">Moitié droite</option>
      </select>

      <div>
        <input
          name="mobileLayout"
          type="checkbox"
          on:input={toggleMobileLayout}
        />
        <label for="mobileLayout">Layout différent sur mobile ?</label>
      </div>

      {#if mobileLayout}
        <p class="generator__form_label">Layout mobile</p>
        <select bind:value={block.mobileLayout} on:change={updateBlock}>
          <option value="default">Par défaut</option>
          <option value="left-half">Moitié gauche</option>
          <option value="right-half">Moitié droite</option>
        </select>
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
            name="mobileTransitions"
            type="checkbox"
            on:input={toggleMobileTransitions}
          />
          <label for="mobileTransitions"
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
    min-width: 350px;
    // margin-left: 20px;
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

  .generator__toggle {
    display: flex;
    align-items: center;
    padding-top: 1em;
    cursor: pointer;

    &::before {
      content: "▶︎";
      font-size: 0.66em;
      padding-right: 0.66em;
      transition: transform 200ms;
    }

    &--open {
      &::before {
        transform: rotate(90deg) translate(2px, 2px);
      }
    }
  }
</style>
