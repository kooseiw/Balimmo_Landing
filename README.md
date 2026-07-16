# Balimmo Landing (Static React)

A standalone, **static** React clone of the Balimmo Properties homepage
(originally the `/` route → `landing/index.blade.php` in the `crm-balimmo-properties`
Laravel app). No backend, no database — dynamic data (featured listings, price maxes)
is hardcoded, and the search / contact forms are non-functional UI.

## Stack

- [Vite](https://vitejs.dev/) 6 + React 18
- [Tailwind CSS](https://tailwindcss.com/) 3

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

```
public/landing/assets/img/   real logos, invest images, section images + hero video (copied faithfully)
src/
  main.jsx                   React entry
  App.jsx                    composes all page sections in order
  index.css                  Tailwind + shared component utilities
  data/properties.js         mock featured-listings data
  components/
    Navbar.jsx               responsive nav with mobile hamburger menu
    Hero.jsx                 video-background hero + SearchBar
    SearchBar.jsx            villa/land tabbed search UI (static)
    InvestRegions.jsx        "Where to Invest in 2025"
    WhyChoose.jsx            "Why choose Balimmo Properties?"
    FeaturedListings.jsx     "Our exclusive listings" grid + IDR/USD toggle
    PropertyCard.jsx         single listing card
    HowItWorks.jsx           4-step timeline
    GroupServices.jsx        group services block
    ContactSection.jsx       "Let our team guide you" static form
    Footer.jsx               logos, contact, links, socials, AREBI, copyright
```

## Notes

- Fully responsive (mobile-first) across mobile / tablet / desktop.
- The IDR/USD toggle on the listings section flips the displayed price labels only.
- Google Translate, Livewire, Swiper, AOS and intl-tel-input from the original are
  intentionally omitted — not needed for a single static page.
