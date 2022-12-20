import { writable } from "svelte/store"

import type { Writable } from "svelte/store"
import type { PageData, BlockData } from "./types"

export const error: Writable<string> = writable('')

export const pagesData: Writable<PageData[]> = writable([])
export const blocksData: Writable<BlockData[]> = writable([])
export const customCssData: Writable<string> = writable('// custom css')
