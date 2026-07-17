import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  MAX_VILLA_BED,
  MAX_VILLA_PRICE_USD,
  MAX_LAND_SIZE_ARE,
  MAX_LAND_PRICE_IDR,
} from '../data/searchOptions.js'
import { scrollToListings } from '../utils/filterProperties.js'

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

  // Applied filters drive the listings section (updated on submit).
  const [appliedTab, setAppliedTab] = useState('villa')
  const [appliedVilla, setAppliedVilla] = useState(villaDefaults)
  const [appliedLand, setAppliedLand] = useState(landDefaults)

  const [docked, setDocked] = useState(false)
  const [sentinel, setSentinel] = useState(null)

  useEffect(() => {
    if (!sentinel || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting && entry.boundingClientRect.top < NAVBAR_OFFSET),
      { root: null, threshold: 0, rootMargin: `-${NAVBAR_OFFSET}px 0px 0px 0px` },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [sentinel])

  const submitSearch = useCallback(
    (overrides = {}) => {
      const nextTab = overrides.tab ?? tab
      setAppliedTab(nextTab)

      if (nextTab === 'villa') {
        const nextVilla = overrides.villa ?? villa
        if (overrides.villa) setVilla(nextVilla)
        setAppliedVilla(nextVilla)
      } else {
        const nextLand = overrides.land ?? land
        if (overrides.land) setLand(nextLand)
        setAppliedLand(nextLand)
      }

      scrollToListings()
    },
    [tab, villa, land],
  )

  const searchByRegion = useCallback((regionName) => {
    const nextVilla = { ...villaDefaults(), areas: [regionName] }
    setTab('villa')
    setVilla(nextVilla)
    setAppliedTab('villa')
    setAppliedVilla(nextVilla)
    scrollToListings()
  }, [])

  const resetSearch = useCallback(() => {
    const nextVilla = villaDefaults()
    const nextLand = landDefaults()
    setTab('villa')
    setVilla(nextVilla)
    setLand(nextLand)
    setAppliedTab('villa')
    setAppliedVilla(nextVilla)
    setAppliedLand(nextLand)
  }, [])

  const value = useMemo(
    () => ({
      tab,
      setTab,
      villa,
      setVilla,
      land,
      setLand,
      appliedTab,
      appliedVilla,
      appliedLand,
      submitSearch,
      searchByRegion,
      resetSearch,
      docked,
      setSentinel,
    }),
    [tab, villa, land, appliedTab, appliedVilla, appliedLand, submitSearch, searchByRegion, resetSearch, docked],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within a SearchProvider')
  return ctx
}
