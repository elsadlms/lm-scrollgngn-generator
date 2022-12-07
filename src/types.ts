import type { transitionOptions } from "./options"

type TransitionName = typeof transitionOptions[number]
type TransitionDuration = string|number
export type TransitionData = [TransitionName]|[TransitionName, TransitionDuration]

type BlockDataLayout = 'default'|'left-half'|'right-half'

export interface BlockData {
  index?: number
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
}

export interface PageData {
  index?: number;
  backgroundColor?: string;
  blocks?: any[]
}