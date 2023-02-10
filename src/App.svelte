<script lang="ts">
  import { uploadId } from "./stores";

  import Form from "./components/Form.svelte";
  import Library from "./components/Library.svelte";
  import Snippet from "./components/Snippet.svelte";
  import FileUpload from "./components/FileUpload.svelte";

  import { libraryIsOpen } from "./stores";

  const toggleLibrary = () => {
    libraryIsOpen.update((status) => !status)
  };

  const isPreviewMode = window.location.search === "?preview";

  $: translatedClass = $libraryIsOpen ? 'wrapper--library-open' : ''
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={translatedClass}>
  {#if isPreviewMode}
    <h1>Preview!</h1>
    <p>{localStorage.getItem("data")}</p>
  {:else}
    <main class="generator">
      <h1>Scrollgngn</h1>

      <FileUpload />

      <p class="generator__library-toggle" on:click={toggleLibrary}>
        { $libraryIsOpen ? 'Fermer' : 'Ouvrir' } la bibliothèque de blocs
      </p>

      {#if $libraryIsOpen}
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

<style global lang="scss">
  h1 {
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .generator__library-toggle {
    padding-top: 32px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .wrapper--library-open {
    transform: translateX(500px);
    transition: transform 500ms;

    .generator__library {
    transform: translateX(-500px);
    }
  }
</style>
