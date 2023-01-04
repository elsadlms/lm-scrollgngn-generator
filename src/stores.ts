import { writable } from "svelte/store"

import type { Writable } from "svelte/store"
import type { PageData, BlockData, SettingsData, ErrorData } from "./types"

import { defaultSettings } from "./models"
import blocksLibrary from "./library"

export const libraryIsOpen: Writable<Boolean> = writable(true)

export const errors: Writable<ErrorData[]> = writable(
  [
    {
      name: "duplicateBlockName",
      text: "Un bloc du même nom existe déjà !",
      active: false
    },
    {
      name: "emptyBlockName",
      text: "Le nom du bloc ne peut pas être vide !",
      active: false
    },
  ]
)

export const settingsData: Writable<SettingsData> = writable(defaultSettings)
export const pagesData: Writable<PageData[]> = writable([])
export const blocksData: Writable<BlockData[]> = writable(blocksLibrary as BlockData[])
export const customCssData: Writable<string> = writable('// custom css')

export const uploadId: Writable<string> = writable('')