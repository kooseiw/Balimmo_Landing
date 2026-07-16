import { useState } from 'react'
import SearchBar from './SearchBar.jsx'
import { useSearch } from '../context/SearchContext.jsx'

const NAV_LINKS = [
  { label: 'Villa for sale', href: '#featured' },
  { label: 'Land for sale', href: '#invest' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { docked } = useSearch()

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-x flex items-center justify-between py-3">
        {/* Logo */}
        <a href="#top" className="flex items-center" aria-label="Balimmo home">
          <img
            src="/landing/assets/img/logo/nav-logo.png"
            alt="Balimmo"
            className="w-[130px] sm:w-[190px]"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded p-2 text-primary lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Docked search: second row that slides in once the hero search scrolls past. */}
      {docked && (
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur">
          <div className="container-x py-3">
            <SearchBar variant="navbar" />
          </div>
        </div>
      )}

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-gray-100 bg-white lg:hidden">
          <ul className="container-x flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block w-full py-3 text-base font-semibold text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
