import { writable } from "svelte/store"

import type { Writable } from "svelte/store"
import type { PageData, BlockData } from "./types"

export const error: Writable<string> = writable('')

export const pagesData: Writable<PageData[]> = writable([])
export const blocksData: Writable<BlockData[]> = writable([
  {
    "index": 0,
    "id": '1670334959316',
    "name": 'bloc0',
    "depth": "scroll",
    "type": "html",
    "layout": "default",
    "content": "<div>un bloc</div>",
    "transitions": [
      [
        "in-fade",
        600
      ]
    ]
  },
  {
    "index": 1,
    "id": '1670334965516',
    "name": 'bloc1',
    "depth": "scroll",
    "type": "html",
    "layout": "default",
    "content": "<div>un bloc</div>",
    "transitions": [
      [
        "in-fade",
        600
      ]
    ]
  },
])

// {
//   "index": 0,
//   "backgroundColor": "#ffffff",
//   "blocks": [
//       {
//           "index": 0,
//           "depth": "scroll",
//           "type": "html",
//           "layout": "default",
//           "content": "<div>un bloc</div>",
//           "transitions": [
//               [
//                   "in-fade",
//                   600
//               ]
//           ]
//       },
//       {
//           "index": 1,
//           "depth": "scroll",
//           "type": "html",
//           "layout": "default",
//           "content": "<div>un bloc</div>",
//           "transitions": [
//               [
//                   "in-fade",
//                   600
//               ]
//           ]
//       },
//       {
//           "index": 2,
//           "depth": "scroll",
//           "type": "html",
//           "layout": "default",
//           "content": "<div>un bloc</div>",
//           "transitions": [
//               [
//                   "in-fade",
//                   600
//               ]
//           ]
//       }
//   ]
// },
// {
//   "index": 1,
//   "backgroundColor": "#ffffff",
//   "blocks": []
// },
// {
//   "index": 2,
//   "backgroundColor": "#ffffff",
//   "blocks": []
// }
