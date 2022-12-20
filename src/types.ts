import type { transitionOptions } from "./options"

type TransitionName = typeof transitionOptions[number]
type TransitionDuration = string|number
export type TransitionData = [TransitionName]|[TransitionName, TransitionDuration]

type BlockDataLayout = 'default'|'left-half'|'right-half'

export interface BlockData {
  id?: string
  name?: string
  depth?: 'scroll'|'front'|'back'
  type?: 'html'|'module'
  layout?: BlockDataLayout
  mobileLayout?: BlockDataLayout
  content?: string
  transitions?: TransitionData[]
  mobileTransitions?: TransitionData[]
  zIndex?: number
  trackScroll?: boolean
}

export interface PageData {
  content?: string;
  index?: number;
  backgroundColor?: string;
  blocks?: any[]
  blockEdited?: string
}