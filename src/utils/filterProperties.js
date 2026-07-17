const CORE_AREAS = new Set(['Ubud', 'Canggu', 'Uluwatu', 'Sanur'])

export function matchesArea(propertyArea, selectedAreas) {
  if (!selectedAreas?.length) return true

  return selectedAreas.some((area) => {
    if (area === 'Sanur/Nusa Dua') {
      return propertyArea === 'Sanur' || propertyArea.includes('Nusa Dua')
    }
    if (area === 'Others') return !CORE_AREAS.has(propertyArea)
    return propertyArea === area
  })
}

function matchesName(name, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return name.toLowerCase().includes(q)
}

function matchesOwnership(legalStatus, selected) {
  if (!selected?.length) return true
  return selected.includes(legalStatus)
}

export function filterVillaProperties(properties, filters) {
  return properties.filter((property) => {
    if (property.type !== 'villa') return false
    if (!matchesName(property.name, filters.name)) return false
    if (property.bedroom < filters.bedMin || property.bedroom > filters.bedMax) return false
    if (property.priceUsd < filters.priceMin || property.priceUsd > filters.priceMax) return false
    if (!matchesArea(property.area, filters.areas)) return false
    if (!matchesOwnership(property.legalStatus, filters.ownership)) return false
    return true
  })
}

export function filterLandProperties(properties, filters) {
  return properties.filter((property) => {
    if (property.type !== 'land') return false
    if (!matchesName(property.name, filters.name)) return false

    const sizeAre = property.sizeAre ?? 0
    if (sizeAre < filters.sizeMin || sizeAre > filters.sizeMax) return false
    if (property.priceIdr < filters.priceMin || property.priceIdr > filters.priceMax) return false
    if (!matchesArea(property.area, filters.areas)) return false
    if (!matchesOwnership(property.legalStatus, filters.ownership)) return false
    return true
  })
}

export function filterProperties(properties, tab, filters) {
  return tab === 'villa'
    ? filterVillaProperties(properties, filters)
    : filterLandProperties(properties, filters)
}

export function scrollToListings() {
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
