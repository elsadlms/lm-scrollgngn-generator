<script lang="ts">
  import Form from "./components/Form.svelte";
  import Snippet from "./components/Snippet.svelte";

  import { errors } from "./stores.js";
</script>

<main class="generator">
  <header><h1>Scrollgngn</h1></header>

  <Form />

  {#each $errors as error}
    <p class="generator__error">{error}</p>
  {/each}

  <Snippet />
</main>

<style lang="scss">
  .generator__error {
    color: red;
  }
</style>
