<script lang="ts">
  import Form from "./components/Form.svelte";
  import Snippet from "./components/Snippet.svelte";

  import { error } from "./stores.js";
</script>

<main class="generator">
  <header><h1>Scrollgngn</h1></header>

  <Form />

  <p class="generator__error">{$error}</p>

  <Snippet />
</main>

<style lang="scss">
  h1 {
    margin-bottom: 32px;
  }

  .generator__error {
    color: red;
  }
</style>
