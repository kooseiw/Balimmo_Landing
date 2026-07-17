import { useMemo, useState } from 'react'
import { featuredProperties } from '../data/properties.js'
import { useSearch } from '../context/SearchContext.jsx'
import { filterProperties } from '../utils/filterProperties.js'
import PropertyCard from './PropertyCard.jsx'

export default function FeaturedListings() {
  const [currency, setCurrency] = useState('IDR')
  const { appliedTab, appliedVilla, appliedLand, resetSearch } = useSearch()

  const filteredProperties = useMemo(
    () =>
      filterProperties(
        featuredProperties,
        appliedTab,
        appliedTab === 'villa' ? appliedVilla : appliedLand,
      ),
    [appliedTab, appliedVilla, appliedLand],
  )

  const resultLabel = appliedTab === 'villa' ? 'villa' : 'land'
  const resultLabelPlural = filteredProperties.length === 1 ? resultLabel : `${resultLabel}s`

  return (
    <section id="featured" className="section-pad scroll-mt-24">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="section-title">Our exclusive listings</h2>
          <p className="mt-4 text-primary/80">
            Discover our exclusive properties, available only through Balimmo. These villas and lands
            represent the finest opportunities in Bali, secured with priority access for our investors
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-semibold text-primary">
            {filteredProperties.length} {resultLabelPlural} found
            <span className="ml-1 font-normal text-primary/60">
              ({appliedTab === 'villa' ? 'Villas' : 'Land'})
            </span>
          </p>

          <div className="inline-flex rounded-full bg-gray-100 p-1">
            {['IDR', 'USD'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                  currency === c ? 'bg-primary text-white' : 'text-primary hover:text-accent'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} currency={currency} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-gray-50 px-6 py-14 text-center ring-1 ring-gray-100">
            <p className="text-lg font-semibold text-primary">No properties match your filters</p>
            <p className="mt-2 text-sm text-primary/70">
              Try adjusting your search criteria or clear all filters to see every listing.
            </p>
            <button type="button" onClick={resetSearch} className="btn-solid mt-6">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
