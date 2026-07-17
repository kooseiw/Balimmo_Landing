import { useEffect, useState } from 'react'

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-primary outline-none placeholder:text-primary/40 focus:border-accent'

function parseAmount(raw) {
  const cleaned = String(raw).replace(/[^\d]/g, '')
  if (!cleaned) return null
  return Number(cleaned)
}

function clampRange(min, max, ceiling) {
  let low = Math.max(0, Math.min(min, ceiling))
  let high = Math.max(0, Math.min(max, ceiling))
  if (low > high) [low, high] = [high, low]
  return [low, high]
}

export default function PriceInputs({ currency, max, valueMin, valueMax, onChange, presets = [] }) {
  const [draftMin, setDraftMin] = useState('')
  const [draftMax, setDraftMax] = useState('')

  useEffect(() => {
    setDraftMin(valueMin === 0 ? '' : String(valueMin))
    setDraftMax(valueMax === max ? '' : String(valueMax))
  }, [valueMin, valueMax, max])

  const commitMin = (raw) => {
    const parsed = parseAmount(raw)
    const nextMin = parsed === null ? 0 : parsed
    onChange(...clampRange(nextMin, valueMax, max))
  }

  const commitMax = (raw) => {
    const parsed = parseAmount(raw)
    const nextMax = parsed === null ? max : parsed
    onChange(...clampRange(valueMin, nextMax, max))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary/50">
            Min ({currency})
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={draftMin}
            onChange={(e) => setDraftMin(e.target.value.replace(/[^\d]/g, ''))}
            onBlur={() => commitMin(draftMin)}
            placeholder="No min"
            className={inputClass}
            aria-label={`Minimum price in ${currency}`}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary/50">
            Max ({currency})
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={draftMax}
            onChange={(e) => setDraftMax(e.target.value.replace(/[^\d]/g, ''))}
            onBlur={() => commitMax(draftMax)}
            placeholder="No max"
            className={inputClass}
            aria-label={`Maximum price in ${currency}`}
          />
        </div>
      </div>

      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.min, preset.max)}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
