<script lang="ts">
  import Page from "./Page.svelte";

  import { pagesData } from "../stores.js";

  const addPage = () => {
    const newPage = {
      index: $pagesData.length,
      backgroundColor: "#fff",
      blocks: []
    }
    pagesData.update(data => [...data, newPage]);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class='generator__form'>
  {#each $pagesData as page}
    <Page {page} />
  {/each}

  <p on:click={addPage}>Ajouter une page</p>
</form>

<style>
.generator__form {
  padding: 32px 0;
}
</style>
