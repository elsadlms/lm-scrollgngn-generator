<script lang="ts">
  import type { BlockData } from "../../types";
  import { blocksData } from "../../stores";
  import { depthOptions, layoutOptions } from "../../options";

  import Transition from "./Transition.svelte";

  export let block: BlockData;

  let mobileTransitions = false;
  let mobileLayout = false;

  const updateBlock = () => {
    blocksData.update((data) => data);
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

  const addTransition = (properties: { mobile?: boolean }) => {
    if (properties.mobile) {
      block.mobileTransitions.push(["fade", 600]);
    } else {
      block.transitions.push(["fade", 600]);
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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__block_options">
  <div class="generator__flex generator__form_group">
    <p class="generator__form_label">Depth</p>
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
  </div>

  <div class="generator__flex generator__form_group">
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
  </div>

  <div class="generator__flex generator__flex--small generator__form_group">
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
    <div class="generator__flex generator__form_group">
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
    </div>
  {/if}

  {#if block.type === "module"}
    <div class="generator__form_group generator__flex generator__flex--small">
      <input
        name={`trackscroll-${block.id}`}
        type="checkbox"
        bind:checked={block.trackScroll}
        on:change={updateBlock}
      />
      <label for={`trackscroll-${block.id}`}>Track scroll</label>
    </div>
  {/if}

  {#if block.depth != "scroll"}
    <div class="generator__form_group generator__flex">
      <p class="generator__form_label">z-index :</p>
      <input type="number" bind:value={block.zIndex} on:change={updateBlock} />
    </div>

    <div class="generator__form_group">
      <p class="generator__form_label generator__form_label--padding">
        Transitions
      </p>

      {#if block.transitions.length > 0}
        <div class="generator__form_transitions">
          {#each block.transitions as transition, index}
            <Transition on:update={updateBlock} {transition}>
              <p on:click={() => deleteTransition({ index })}>X</p>
            </Transition>
          {/each}
        </div>
      {/if}

      <p
        class="generator__form_button--uppercase"
        on:click={() => addTransition({})}
      >
        + Nouvelle transition
      </p>
    </div>

    <div class="generator__flex generator__flex--small generator__form_group">
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
      <div class="generator__form_group">
        <p class="generator__form_label generator__form_label--padding">
          Transitions mobile
        </p>

        {#if block.mobileTransitions.length > 0}
          <div class="generator__form_transitions">
            {#each block.mobileTransitions as transition, index}
              <Transition on:update={updateBlock} {transition}>
                <p on:click={() => deleteTransition({ index, mobile: true })}>
                  X
                </p>
              </Transition>
            {/each}
          </div>
        {/if}

        <p
          class="generator__form_button--uppercase"
          on:click={() => addTransition({ mobile: true })}
        >
          + Nouvelle transition
        </p>
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .generator__form_transitions {
    padding-bottom: 12px;
  }
</style>
