export type Popup = {
  type: 'error' | 'success' | 'waiting'
  message: string
  toRoute?: string
} | null