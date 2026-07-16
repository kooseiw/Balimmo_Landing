import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  MAX_VILLA_BED,
  MAX_VILLA_PRICE_USD,
  MAX_LAND_SIZE_ARE,
  MAX_LAND_PRICE_IDR,
} from '../data/searchOptions.js'

// Default ("Any") filter state per tab.
export const villaDefaults = () => ({
  name: '',
  bedMin: 0,
  bedMax: MAX_VILLA_BED,
  priceMin: 0,
  priceMax: MAX_VILLA_PRICE_USD,
  areas: [],
  ownership: [],
})
export const landDefaults = () => ({
  name: '',
  sizeMin: 0,
  sizeMax: MAX_LAND_SIZE_ARE,
  priceMin: 0,
  priceMax: MAX_LAND_PRICE_IDR,
  areas: [],
  ownership: [],
})

const SearchContext = createContext(null)

// Approx navbar height — the search docks once the hero search scrolls above this line.
const NAVBAR_OFFSET = 72

export function SearchProvider({ children }) {
  const [tab, setTab] = useState('villa')
  const [villa, setVilla] = useState(villaDefaults)
  const [land, setLand] = useState(landDefaults)

  // Dock state: true once the hero search bar scrolls up past the navbar.
  const [docked, setDocked] = useState(false)
  const [sentinel, setSentinel] = useState(null) // callback-ref target from Hero

  useEffect(() => {
    if (!sentinel || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      // Dock only when the sentinel has scrolled ABOVE the navbar (not merely off-screen).
      // Guarding on boundingClientRect.top keeps the navbar search hidden by default when the
      // hero content starts taller than the viewport (sentinel below the fold at load).
      ([entry]) => setDocked(!entry.isIntersecting && entry.boundingClientRect.top < NAVBAR_OFFSET),
      { root: null, threshold: 0, rootMargin: `-${NAVBAR_OFFSET}px 0px 0px 0px` },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [sentinel])

  const value = useMemo(
    () => ({ tab, setTab, villa, setVilla, land, setLand, docked, setSentinel }),
    [tab, villa, land, docked],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within a SearchProvider')
  return ctx
}
