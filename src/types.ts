import type { transitionOptions } from "./options"

type TransitionName = typeof transitionOptions[number]
type TransitionDuration = string | number
export type TransitionData = [TransitionName] | [TransitionName, TransitionDuration]

type depthData = 'scroll' | 'front' | 'back'
type typeData = 'html' | 'module'
type layoutData = 'left-half' | 'right-half' | 'full-screen'

export interface BlockData {
  id?: string
  name?: string
  depth?: depthData
  type?: typeData
  layout?: layoutData
  mobileLayout?: layoutData
  content?: string
  transitions?: TransitionData[]
  mobileTransitions?: TransitionData[]
  zIndex?: number
  trackScroll?: boolean
}

export interface PageData {
  content?: string
  contentType?: typeData
  contentLayout?: layoutData
  contentMobileLayout?: layoutData
  index?: number
  bgColor?: string
  blocks?: any[]
  blockEdited?: string
}

export interface SettingsData {
  bgColorTransitionDuration?: number
  thresholdOffset?: number
}

export interface ScrollgngnData {
  pages: PageData[],
  bgColorTransitionDuration?: number
  thresholdOffset?: number
}

export interface ErrorData {
  name?: string
  text?: string
  active?: boolean
}