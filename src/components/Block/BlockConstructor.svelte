<script lang="ts">
  import type { BlockData, ErrorData } from "../../types";
  import { blocksData, pagesData, errors } from "../../stores";
  import { typeOptions } from "../../options";

  import Info from "../Styled/Info.svelte";
  import BlockOptions from "./BlockOptions.svelte";

  export let block: BlockData;

  let optionsOpen = true;

  const addErrorToStore = (errorName: string) => {
    errors.update((stored) => {
      stored.map((error) => {
        if (error.name === errorName) {
          error.active = true;
        }
      });
      return stored;
    });
  };

  const deleteErrorFromStore = (errorName: string) => {
    errors.update((stored) => {
      stored.map((error) => {
        if (error.name === errorName) {
          error.active = false;
        }
      });
      return stored;
    });
  };

  const updateBlock = () => {
    // on corrige si option pas possible
    if (block.type === "module" && block.depth === "scroll") {
      block.depth = "back";
    }

    // on vérifie s'il n'y a pas de doublon
    const sameNameArray: BlockData[] = $blocksData.filter(
      (el) => el.name === block.name
    );

    if (sameNameArray.length > 1) {
      addErrorToStore("duplicateBlockName");
      return;
    } else {
      deleteErrorFromStore("duplicateBlockName");
    }

    // on vérifie si le nom n'est pas vide
    if (block.name === "") {
      addErrorToStore("emptyBlockName");
      return;
    } else {
      deleteErrorFromStore("emptyBlockName");
    }

    // on vérifie si le contenu n'est pas vide
    if (block.content === "") {
      addErrorToStore("emptyBlockContent");
      return;
    } else {
      deleteErrorFromStore("emptyBlockContent");
    }

    blocksData.update((data) => data);
  };

  const toggleOptions = () => {
    optionsOpen = !optionsOpen;
  };

  $: inputContentClass = `generator__block_content generator__contenteditable ${
    block.type === "html"
      ? "generator__block_content--html"
      : "generator__block_content--module"
  }`;

  $: optionsToggleClass = `generator__toggle ${
    optionsOpen ? "generator__toggle--open" : ""
  }`;

  $: warningOnEdit = () => {
    const pages = [];

    // on vérifie si le bloc est présent dans d'autres pages
    $pagesData.map((page) => {
      const found = page.blocks.find((el) => el === block.id);
      if (found && !page.blockEdited) pages.push(page.index + 1);
    });

    // si pas présent dans d'autres pages, pas d'avertissement
    if (pages.length === 0) return null;

    // si présent dans d'autres pages, avertissement avec les pages concernées
    let pagesToText = "";

    if (pages.length === 1) pagesToText = `la page ${pages[0]}.`;

    if (pages.length > 1) {
      pagesToText = "les pages";
      for (const [i, page] of pages.entries()) {
        if (i === pages.length - 1) pagesToText += ` et ${page}.`;
        else if (i === pages.length - 2) pagesToText += ` ${page}`;
        else pagesToText += ` ${page},`;
      }
    }

    const text = `Attention, ces modifications seront également appliquées dans ${pagesToText}`;
    return text;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="generator__block">
  {#each $errors as error}
    {#if error.active}
      <Info marginBottom={20} error>{error.text}</Info>
    {/if}
  {/each}

  <!-- {#if $error.duplicateBlockName}
    <Info marginBottom={20} error>{$error.duplicateBlockName}</Info>
  {/if} -->

  {#if warningOnEdit()}
    <Info marginBottom={20} warning>{warningOnEdit()}</Info>
  {/if}

  <h3>
    <span
      on:keyup={updateBlock}
      bind:textContent={block.name}
      contenteditable="true"
    />
  </h3>

  <!-- <p>Dupliquer un bloc existant ?</p>
  <select bind:value={block}>
    {#each $blocksData as el}
      {#if el.id != block.id}
        <option value={el}>{el.name}</option>
      {/if}
    {/each}
  </select> -->

  <div class="generator__form_group generator__flex">
    <p class="generator__form_label">Type</p>
    {#each typeOptions as option}
      <label>
        <input
          type="radio"
          name={`type-${block.id}`}
          bind:group={block.type}
          on:change={updateBlock}
          value={option}
        />
        {option}
      </label>
    {/each}
  </div>

  <div class="generator__form_group">
    <p class="generator__form_label">
      {block.type === "module" ? "URL" : "Contenu"}
    </p>
    <p
      class={inputContentClass}
      on:keyup={updateBlock}
      bind:textContent={block.content}
      contenteditable="true"
    />
  </div>

  <div class="generator__form_group">
    <!-- <h4 class={optionsToggleClass} on:click={toggleOptions}>Options</h4> -->
    {#if optionsOpen}
      <BlockOptions {block} />
    {/if}
  </div>
</div>

<style lang="scss">
  .generator__block {
    padding: 20px;
    border-radius: var(--gen-border-radius);
    transition: background-color 200ms;
    margin-bottom: 20px;
    background-color: var(--gen-c-lighter);

    h3 {
      margin-bottom: 20px;

      span {
        background-color: var(--gen-c-lightest);
        padding: 0.4em 0.6em 0.2em;
        font-family: monospace;
      }
    }
  }

  .generator__block_content {
    margin-top: 6px;
    padding: 12px;
    border-radius: 4px;
    background-color: var(--gen-c-lightest);
    border: 1px dashed var(--gen-c-neutral);
    font-family: monospace;
    width: 100%;
    max-width: 100%;

    &--html {
      min-height: 100px;
    }
  }
</style>
