import bzpLogo from '../assets/images/bzp.png'
import planoutLogo from '../assets/images/planout.png'
import korteLogo from '../assets/images/korte.png'

export const projects = [
  {
    id: 'bzp',
    variant: 'fire',
    logo: bzpLogo,
    client: 'BeetzeePLAY',
    tags: ['Streaming', 'Mobile'],
    title: 'BeetzeePLAY: Vertical Short Drama',
    description:
      'Built a scalable video streaming platform with subscription management, content delivery, and mobile-first experience for a growing audience of independent film lovers across Southeast Asia.',
    body: [
      {
        type: 'paragraph',
        text: 'The app offers a curated mix of local and Asian series, perfectly paced for quick, high-quality entertainment on the go. To keep things simple, Beetzee Play is easy to access through E-wallets and is available on both the Apple App Store and Google Play Store.',
      },
    ],
  },
  {
    id: 'planout',
    variant: 'ember',
    logo: planoutLogo,
    client: 'PlanOut',
    tags: ['Ticketing', 'Web App'],
    title: 'PlanOut: Your All-Access Pass to Adventure',
    description:
      'PlanOut is a user-friendly app designed to make attending outdoor adventure events simple and stress-free. It provides a reliable place for guests to buy tickets and keep track of their bookings all in one spot. By streamlining the entire process from purchase to check-in, PlanOut ensures that attendees spend less time handling paperwork and more time enjoying the outdoors.',
  },
  {
    id: 'korte',
    variant: 'gold',
    logo: korteLogo,
    client: 'Korte Philippines',
    tags: ['Marketplace', 'UX / UI'],
    title: 'Korte: Play Without the Wait',
    description:
      'Court discovery and booking platform with availability calendars, venue management tools, and a seamless mobile booking flow for basketball, badminton, and tennis facilities across the Philippines.',
    body: [
      {
        type: 'heading',
        text: 'Background',
      },
      {
        type: 'paragraph',
        text: 'Sports court bookings in the Philippines were almost entirely offline — phone calls, Facebook messages, and walk-ins. Korte Philippines set out to change that with a marketplace that lets players find and book courts the same way they book hotels.',
      },
      {
        type: 'heading',
        text: 'Design & Development',
      },
      {
        type: 'paragraph',
        text: 'We led the full product design and frontend development. The primary design challenge was making court availability intuitive across different sports, venue sizes, and pricing structures without overwhelming casual users.',
      },
      {
        type: 'list',
        items: [
          { bold: 'Discovery layer: ', text: 'Map-based and list-based search with filters for sport type, location, price, and amenities.' },
          { bold: 'Availability calendar: ', text: 'Real-time slot management with buffer times and recurring booking support for regulars.' },
          { bold: 'Venue dashboard: ', text: 'Court owners can manage listings, block dates, set dynamic pricing, and track earnings.' },
          { bold: 'Mobile booking flow: ', text: 'Three-tap booking optimized for low-end Android devices common in provincial areas.' },
        ],
      },
      {
        type: 'heading',
        text: 'Impact',
      },
      {
        type: 'paragraph',
        text: 'Korte launched with 38 venues across Cebu and Metro Manila. Within three months, the platform was facilitating over 600 bookings per week with a 91% booking completion rate — well above the industry average for marketplace platforms in the region.',
      },
    ],
  },
]
