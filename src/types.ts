export type TransitionData = [string, string|number|undefined]

// export type TransitionData = any[]

export interface BlockData {
  index?: number
  id?: string
  depth?: string
  type?: string
  layout?: string
  mobileLayout?: string
  content?: string
  transitions?: TransitionData[]
  mobileTransitions?: TransitionData[]
}

export interface PageData {
  index?: number;
  backgroundColor?: string;
  blocks?: BlockData[]
}