// Static search options / constants mirroring the original Laravel hero search
// (Blade vars $areas, $max_villa_bed, $max_villa_price_usd, $max_land_size_are, $max_land_price_idr).

export const AREAS = ['Ubud', 'Canggu', 'Uluwatu', 'Sanur/Nusa Dua', 'Others']

export const VILLA_OWNERSHIP = ['Leasehold', 'Freehold']
export const LAND_OWNERSHIP = ['New Leasehold', 'Leasehold', 'Freehold']

// Slider ranges (stand-ins for the dynamic maxes computed in the controller)
export const MAX_VILLA_BED = 10
export const VILLA_BED_STEP = 1

export const MAX_VILLA_PRICE_USD = 2_000_000
export const VILLA_PRICE_STEP = 5_000

export const MAX_LAND_SIZE_ARE = 100
export const LAND_SIZE_STEP = 1

export const MAX_LAND_PRICE_IDR = 30_000_000_000
export const LAND_PRICE_STEP = 100_000_000

export const VILLA_PRICE_PRESETS = [
  { label: 'Under $400k', min: 0, max: 400_000 },
  { label: '$400k – $700k', min: 400_000, max: 700_000 },
  { label: '$700k+', min: 700_000, max: MAX_VILLA_PRICE_USD },
]

export const LAND_PRICE_PRESETS = [
  { label: 'Under 5B', min: 0, max: 5_000_000_000 },
  { label: '5B – 10B', min: 5_000_000_000, max: 10_000_000_000 },
  { label: '10B+', min: 10_000_000_000, max: MAX_LAND_PRICE_IDR },
]

// Currency formatting helpers
export const formatUsd = (n) => `$ ${Number(n).toLocaleString('en-US')}`
export const formatIdr = (n) => `IDR ${Number(n).toLocaleString('en-US')}`
