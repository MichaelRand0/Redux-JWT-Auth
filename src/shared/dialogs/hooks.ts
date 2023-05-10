import { useState } from 'react'

export function useDialog() {
  const [open, setOpen] = useState(false)
  const toggleOpen = (bool:boolean) => setOpen(bool)

  return {
    open,
    setOpen,
    toggleOpen,
  }
}
