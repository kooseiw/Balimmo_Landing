import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const POPOVER_GAP = 8
const POPOVER_MIN_WIDTH = 260

// Desktop filter chip: a pill trigger that toggles a body-portaled popover so it is
// never clipped by hero `overflow-hidden` / navbar `backdrop-blur` (esp. Area list).
export default function FilterChip({
  chipKey,
  label,
  value,
  isOpen,
  onToggle,
  onClose,
  onClear,
  children,
  popoverClassName = '',
}) {
  const triggerRef = useRef(null)
  const popoverRef = useRef(null)
  const [position, setPosition] = useState(null)

  useLayoutEffect(() => {
    if (!isOpen) {
      setPosition(null)
      return undefined
    }

    function updatePosition() {
      const trigger = triggerRef.current
      const popover = popoverRef.current
      if (!trigger) return

      const rect = trigger.getBoundingClientRect()
      const popoverHeight = popover?.offsetHeight ?? 300
      const spaceBelow = window.innerHeight - rect.bottom - POPOVER_GAP
      const spaceAbove = rect.top - POPOVER_GAP
      const openUpward = spaceBelow < popoverHeight && spaceAbove > spaceBelow
      const maxHeight = Math.max(160, openUpward ? spaceAbove : spaceBelow)
      const width = Math.max(POPOVER_MIN_WIDTH, rect.width)
      const left = Math.min(rect.left, window.innerWidth - width - POPOVER_GAP)

      setPosition({
        openUpward,
        left: Math.max(POPOVER_GAP, left),
        width,
        maxHeight,
        top: openUpward ? undefined : rect.bottom + POPOVER_GAP,
        bottom: openUpward ? window.innerHeight - rect.top + POPOVER_GAP : undefined,
      })
    }

    updatePosition()
    // Re-measure after paint so maxHeight uses real popover height when flipping.
    const frame = requestAnimationFrame(updatePosition)

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, children])

  useEffect(() => {
    if (!isOpen) return undefined

    function onPointer(event) {
      const target = event.target
      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) return
      onClose(event)
    }

    function onKey(event) {
      if (event.key === 'Escape') onClose(event)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onToggle(chipKey)}
        className={`flex min-w-[120px] items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors ${
          isOpen
            ? 'border-accent bg-white shadow-sm'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary/50">
            {label}
          </span>
          <span className="text-sm font-semibold text-primary">{value}</span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-primary/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'fixed',
              top: position?.top,
              bottom: position?.bottom,
              left: position?.left ?? 0,
              width: position?.width,
              maxHeight: position?.maxHeight,
              visibility: position ? 'visible' : 'hidden',
            }}
            className={`z-[100] flex min-w-[260px] flex-col overflow-hidden rounded-xl bg-white text-left text-primary shadow-xl ring-1 ring-gray-100 ${popoverClassName}`}
          >
            <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-0">{children}</div>
            <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-4 py-3">
              <button
                type="button"
                onClick={onClear}
                className="text-sm font-semibold text-primary/60 hover:text-primary"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep"
              >
                Apply
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
