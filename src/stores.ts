import { writable } from "svelte/store"

import type { Writable } from "svelte/store"
import type { PageData, BlockData, SettingsData, Errors } from "./types"

import { defaultSettings } from "./models"

export const error: Writable<Errors> = writable({
  duplicate: ''
})

export const settingsData: Writable<SettingsData> = writable(defaultSettings)

export const pagesData: Writable<PageData[]> = writable([])
export const blocksData: Writable<BlockData[]> = writable([])
export const customCssData: Writable<string> = writable('// custom css')
