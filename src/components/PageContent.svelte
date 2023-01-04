<script lang="ts">
  import { typeOptions, layoutOptions } from "../options";

  import type { PageData } from "../types";
  import { pagesData } from "../stores";

  export let page: PageData;

  let mobileLayout = false;

  const toggleMobileLayout = () => {
    mobileLayout = !mobileLayout;

    if (!mobileLayout) {
      delete page.contentMobileLayout;
    } else {
      page.contentMobileLayout = "default";
    }

    updateData();
  };

  const updateData = () => {
    pagesData.update((data) => data);
  };
</script>

<div class="generator__form_group">
  <p class="generator__form_label generator__form_label--header">Contenu</p>

  <div class="generator__page_content">
    <div class="generator__form_group generator__flex">
      <p class="generator__form_label">Type</p>
      {#each typeOptions as option}
        <label>
          <input
            type="radio"
            name={`type-${page.index}`}
            bind:group={page.contentType}
            on:change={updateData}
            value={option}
          />
          {option}
        </label>
      {/each}
    </div>

    <div class="generator__form_group">
      <p
        class="generator__page_content_input generator__contenteditable"
        on:keyup={updateData}
        bind:textContent={page.content}
        contenteditable="true"
      />
    </div>

    <div class="generator__flex generator__form_group">
      <p class="generator__form_label">Layout</p>
      {#each layoutOptions as option}
        <label>
          <input
            type="radio"
            name={`layout-${page.index}`}
            bind:group={page.contentLayout}
            on:change={updateData}
            value={option}
          />
          {option}
        </label>
      {/each}
    </div>

    <div class="generator__flex generator__flex--small generator__form_group">
      <input
        name={`mobile-layout-check-${page.index}`}
        type="checkbox"
        on:input={toggleMobileLayout}
      />
      <label for={`mobile-layout-check-${page.index}`}
        >Layout différent sur mobile ?</label
      >
    </div>

    {#if mobileLayout}
      <div class="generator__flex generator__form_group">
        <p class="generator__form_label">Layout mobile</p>
        {#each layoutOptions as option}
          <label>
            <input
              type="radio"
              name={`mobile-layout-${page.index}`}
              bind:group={page.contentMobileLayout}
              on:change={updateData}
              value={option}
            />
            {option}
          </label>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .generator__page_content_input {
    margin-top: 6px;
    padding: 12px;
    border-radius: 4px;
    background-color: var(--gen-c-lightest);
    border: 1px dashed var(--gen-c-neutral);
    font-family: monospace;
    width: 100%;
    max-width: 100%;
  }

  .generator__page_content {
    background-color: var(--gen-c-lighter);
    padding: var(--gen-gutter);
    border-radius: var(--gen-border-radius);
  }

  .generator__page_content .generator__form_group:first-child {
    margin-top: 0;
  }
</style>
