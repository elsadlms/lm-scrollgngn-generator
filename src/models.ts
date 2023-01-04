import type { BlockData, PageData, SettingsData } from "./types"

export const defaultBlock: BlockData = {
  depth: 'back',
  type: 'html',
  layout: 'default',
  content: '<div>un bloc</div>',
  transitions: [],
}

export const defaultPage: PageData = {
  bgColor: '#ffffff',
  content: '<div>Contenu de la page</div>',
  contentType: 'html',
  contentLayout: 'default',
  blocks: []
}

export const defaultSettings: SettingsData = {
  bgColorTransitionDuration: 200,
  thresholdOffset: 0,
}