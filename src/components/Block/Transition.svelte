<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { transitionOptions } from "../../options";
  import type { TransitionData } from "../../types";

  export let transition: TransitionData;

  const dispatch = createEventDispatcher();

  const updateTransition = () => {
    dispatch("update", { transition });
  };
</script>

<div class="generator__transition">
  <div class="generator__flex">
    <p class="generator__transition_label">Nom :</p>
    <select bind:value={transition[0]} on:change={updateTransition}>
      {#each transitionOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>

  <div class="generator__flex">
    <p class="generator__transition_label">Durée :</p>
    <input
      type="number"
      bind:value={transition[1]}
      on:change={updateTransition}
    />
  </div>

  <div class="generator__transition_delete">
    <slot />
  </div>
</div>

<style lang="scss">
  .generator__transition {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px dashed var(--gen-c-neutral);
    max-width: 500px;

    &:first-of-type {
      border-top: 1px dashed var(--gen-c-neutral);
    }

    &_label {
      font-weight: 500;
    }

    .generator__flex {
      align-self: stretch;
    }

    select {
      background-color: var(--gen-c-lightest);
      align-self: stretch;
      border-radius: 0;
      font-family: monospace;
    }
  }

  .generator__transition_delete {
    color: var(--gen-c-neutral);
    position: relative;
    top: 2px;
    cursor: pointer;
  }
</style>
