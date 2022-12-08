<script lang="ts">
  import { pagesData, blocksData } from "../stores.js";

  let notification = false;

  $: data = [...$pagesData].map((page) => {
    const { index, ...pageData } = { ...page };
    pageData.blocks = page.blocks.map((el) => {
      const { name, ...block } = $blocksData.find((block) => block.id === el);
      block.id = name;
      return block;
    });
    return pageData;
  });

  $: output = JSON.stringify(data, null, 4);

  $: notificationActiveClass = notification
    ? "generator__snippet_copy-notification generator__snippet_copy-notification--active"
    : "generator__snippet_copy-notification";

  const copyOutputToClipboard = () => {
    if (!output) return;
    if (!navigator.clipboard) return;

    console.log(output);

    navigator.clipboard.writeText(output);

    notification = true;

    window.setTimeout(() => {
      notification = false;
    }, 2000);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__snippet">
  <div class="generator__snippet_copy" on:click={copyOutputToClipboard}>
    <p class="generator__snippet_copy-btn">Copier le code</p>
    <p class={notificationActiveClass}>
      Le code a été copié dans le presse-papier !
    </p>
  </div>

  <pre>{output}</pre>
</div>

<style lang="scss">
  .generator__snippet {
    background-color: var(--gen-dark-grey);
    color: #eee;
    overflow-x: scroll;
    padding: 24px;
    border-radius: 6px;

    pre {
      margin-top: 32px;
    }
  }

  .generator__snippet_copy {
    display: flex;
    padding-bottom: 1em;
    position: absolute;

    &-btn {
      text-transform: uppercase;
      font-size: 0.9em;
      text-decoration: underline;
      text-underline-offset: 0.2em;
      transition: opacity 200ms;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }

    &-notification {
      opacity: 0;
      transition: opacity 200ms;
      margin-left: 1em;
      color: #a4ffb0;
    }
  }

  .generator__snippet_copy-notification--active {
    opacity: 0.8;
  }
</style>
