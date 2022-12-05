import { writable } from "svelte/store"

import type { Writable } from "svelte/store"
import type { PageData } from "./types"

export const errors: Writable<string[]> = writable([])

export const pagesData: Writable<PageData[]> = writable([
  {
      "index": 0,
      "backgroundColor": "#fff",
      "blocks": [
          {
              "index": 0,
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
              "index": 2,
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
          }
      ]
  },
  {
      "index": 1,
      "backgroundColor": "#fff",
      "blocks": []
  },
  {
      "index": 2,
      "backgroundColor": "#fff",
      "blocks": []
  }
])