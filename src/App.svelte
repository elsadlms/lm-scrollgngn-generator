<script lang="ts">
  import { libraryIsOpen } from "./stores";

  import Form from "./components/Form.svelte";
  import Library from "./components/Library.svelte";
  import Snippet from "./components/Snippet.svelte";

  const toggleLibrary = () => {
    libraryIsOpen.update((stored) => {
      return !stored;
    });
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="generator">
  <header><h1>Scrollgngn</h1></header>

  <p class="generator__library-toggle" on:click={toggleLibrary}>Toggle library</p>
  
  {#if $libraryIsOpen}
    <Library />
  {/if}

  <Form />
  <Snippet />
</main>

<style lang="scss">
  h1 {
    margin-bottom: 32px;
  }

  .generator__library-toggle {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
</style>
