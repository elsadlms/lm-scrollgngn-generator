<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { TransitionData } from "../types";

  export let transition: TransitionData;
  export let direction: string;

  const dispatch = createEventDispatcher();

  const updateTransition = () => {
    dispatch("update", { transition });
  };
</script>

<div>
  <div class="generator__flex">
    <p>Nom :</p>
    <select bind:value={transition[0]} on:change={updateTransition}>
      <option value={`${direction}-fade`}>Fade</option>
      <option value={`${direction}-grow`}>Grow</option>
    </select>
  </div>

  <div class="generator__flex">
    <p>Durée :</p>
    <input
      type="number"
      bind:value={transition[1]}
      on:change={updateTransition}
    />
  </div>
</div>
