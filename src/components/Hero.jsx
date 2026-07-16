import SearchBar from './SearchBar.jsx'
import { useSearch } from '../context/SearchContext.jsx'

export default function Hero() {
  const { setSentinel } = useSearch()

  return (
    <section id="top" className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        poster="/landing/assets/img/banner/video-fallback.png"
      >
        <source src="/landing/assets/img/banner/video-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container-x relative z-10 py-20 text-center text-white">
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
          Invest in Bali with Confidence
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 sm:text-lg">
          Hand-picked villas &amp; lands, tested and secured for your peace of mind.
        </p>

        <div className="mt-10">
          <SearchBar variant="hero" />
        </div>

        {/* Sentinel: when this scrolls above the navbar, the search docks into the navbar. */}
        <div ref={setSentinel} aria-hidden="true" className="h-px w-full" />
      </div>
    </section>
  )
}
