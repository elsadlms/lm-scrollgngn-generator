export type TransitionData = [string, string|number|undefined]

// export type TransitionData = any[]

export interface BlockData {
  index?: number
  id?: any
  depth?: string
  type?: string
  layout?: string
  mobileLayout?: string
  content?: string
  transitions?: TransitionData[]
  mobileTransitions?: TransitionData[]
  zIndex?: number
}

export interface PageData {
  index?: number;
  backgroundColor?: string;
  blocks?: BlockData[]
}