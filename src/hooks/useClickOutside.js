import { useEffect } from 'react'

// Calls `handler` when a pointerdown / touchstart happens outside `ref`,
// or when the Escape key is pressed. Used to dismiss popovers and the mobile sheet.
export default function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return undefined

    function onPointer(event) {
      const el = ref.current
      if (!el || el.contains(event.target)) return
      handler(event)
    }

    function onKey(event) {
      if (event.key === 'Escape') handler(event)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, handler, active])
}
