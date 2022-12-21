import type { BlockData, PageData, SettingsData } from "./types"

export const defaultBlock: BlockData = {
  depth: 'scroll',
  type: 'html',
  layout: 'default',
  content: '<div>un bloc</div>',
  transitions: [],
}

export const defaultPage: PageData = {
  backgroundColor: '#ffffff',
  content: '<div>Contenu de la page</div>',
  blocks: []
}

export const defaultSettings: SettingsData = {
  bgColorTransitionDuration: 200,
  thresholdOffset: 0,
}