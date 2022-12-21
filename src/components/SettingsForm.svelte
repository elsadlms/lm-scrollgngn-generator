<script lang="ts">
  import { settingsData } from "../stores";

  let bgColorTransitionDuration: number =
    $settingsData.bgColorTransitionDuration;
  let thresholdOffset: number = $settingsData.thresholdOffset;

  const updateSettings = () => {
    settingsData.update(() => {
      return { bgColorTransitionDuration, thresholdOffset };
    });
    console.log($settingsData);
  };
</script>

<div class="generator__settings">
  <p>Durée de la transition de couleur de fond (en ms) :</p>
  <input
    type="number"
    step="100"
    min="0"
    bind:value={bgColorTransitionDuration}
    on:change={updateSettings}
  />
  <p>Threshold offset (en pourcentage) :</p>
  <input
    type="number"
    step="10"
    min="0"
    max="100"
    bind:value={thresholdOffset}
    on:change={updateSettings}
  />
</div>

<style lang="scss">
  .generator__settings {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 6px;
    align-items: center;
  }
</style>
