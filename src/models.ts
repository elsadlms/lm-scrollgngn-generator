import type { BlockData, PageData } from "./types"

export const defaultBlock: BlockData = {
  depth: 'scroll',
  type: 'html',
  layout: 'default',
  content: '<div>un bloc</div>',
  transitions: [],
}

export const defaultPage: PageData = {
  backgroundColor: '#ffffff',
  blocks: []
}