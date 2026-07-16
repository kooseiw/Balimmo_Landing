import { useState } from 'react'

// Dual-thumb range slider (two overlaid <input type="range">), mirroring the
// original hero search sliders: colored fill between thumbs, a value bubble on the
// active thumb, min/max limit labels, and thumb-crossing prevention.
export default function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  valueMin,
  valueMax,
  onChange,
  format = (v) => v,
}) {
  const [active, setActive] = useState(null) // 'min' | 'max' | null

  const pct = (v) => ((v - min) / (max - min)) * 100
  const aPct = pct(valueMin)
  const bPct = pct(valueMax)

  const handleMin = (e) => {
    const next = Math.min(Number(e.target.value), valueMax)
    onChange(next, valueMax)
  }
  const handleMax = (e) => {
    const next = Math.max(Number(e.target.value), valueMin)
    onChange(valueMin, next)
  }

  return (
    <div className="pt-6">
      {/* Track */}
      <div className="relative h-6 select-none">
        {/* Base bar */}
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200" />
        {/* Active fill */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent"
          style={{ left: `${aPct}%`, right: `${100 - bPct}%` }}
        />

        {/* Bubble on the active thumb */}
        {active && (
          <div
            className="pointer-events-none absolute -top-5 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-0.5 text-xs font-semibold text-white"
            style={{ left: `${active === 'min' ? aPct : bPct}%` }}
          >
            {format(active === 'min' ? valueMin : valueMax)}
          </div>
        )}

        {/* Min thumb */}
        <input
          type="range"
          className="range-thumb"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={handleMin}
          onPointerDown={() => setActive('min')}
          onPointerUp={() => setActive(null)}
          onBlur={() => setActive(null)}
          style={{ zIndex: active === 'min' ? 6 : 5 }}
          aria-label="Minimum"
        />
        {/* Max thumb */}
        <input
          type="range"
          className="range-thumb"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={handleMax}
          onPointerDown={() => setActive('max')}
          onPointerUp={() => setActive(null)}
          onBlur={() => setActive(null)}
          style={{ zIndex: active === 'max' ? 6 : 5 }}
          aria-label="Maximum"
        />
      </div>

      {/* Limit labels */}
      <div className="mt-2 flex justify-between text-xs text-primary/60">
        <span>{format(valueMin)}</span>
        <span>{format(valueMax)}</span>
      </div>
    </div>
  )
}
