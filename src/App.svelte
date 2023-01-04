<script lang="ts">
  import { uploadId } from "./stores";

  import Form from "./components/Form.svelte";
  import Library from "./components/Library.svelte";
  import Snippet from "./components/Snippet.svelte";
  import FileUpload from "./components/FileUpload.svelte";

  let libraryIsOpen = false;

  const toggleLibrary = () => {
    libraryIsOpen = !libraryIsOpen;
  };

  const isPreviewMode = window.location.search === "?preview";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div>
  {#if isPreviewMode}
    <h1>Preview!</h1>
    <p>{localStorage.getItem("data")}</p>
  {:else}
    <main class="generator">
      <h1>Scrollgngn</h1>

      <FileUpload />

      <p class="generator__library-toggle" on:click={toggleLibrary}>
        { libraryIsOpen ? 'Fermer' : 'Ouvrir' } la bibliothèque de blocs
      </p>

      {#if libraryIsOpen}
        <Library />
      {/if}

      <!-- on rerender si on upload un fichier -->
      {#key $uploadId}
        <Form />
      {/key}

      <Snippet />
    </main>
  {/if}
</div>

<style lang="scss">
  h1 {
    margin-bottom: 32px;
  }

  .generator__library-toggle {
    padding-top: 32px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
</style>
