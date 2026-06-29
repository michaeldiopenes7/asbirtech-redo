import bzpLogo from '../assets/images/bzp.png'
import planoutLogo from '../assets/images/planout.png'
import tripketLogo from '../assets/images/Tripketph.png'
import tripketImg from '../assets/images/tripketimg.png'
import tripketCover from '../assets/images/Tripketprjcover.png'
import bzpImg from '../assets/images/bzpprojcover.png'
import planoutImg from '../assets/images/planoutprjcover.png'

export const projects = [
  {
    id: 'bzp',
    variant: 'fire',
    logo: bzpLogo,
    image: bzpImg,
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
    image: planoutImg,
    client: 'PlanOut',
    tags: ['Ticketing', 'Web App'],
    title: 'PlanOut: Your All-Access Pass to Adventure',
    description:
      'PlanOut is a user-friendly app designed to make attending outdoor adventure events simple and stress-free. It provides a reliable place for guests to buy tickets and keep track of their bookings all in one spot. By streamlining the entire process from purchase to check-in, PlanOut ensures that attendees spend less time handling paperwork and more time enjoying the outdoors.',
  },
  {
    id: 'tripket',
    variant: 'gold',
    logo: tripketLogo,
    image: tripketCover,
    imagePosition: 'center 25%',
    client: 'Tripket PH',
    tags: ['Travel', 'Booking'],
    title: 'Tripket PH: Sea Travel, Simplified',
    description:
      'A sea-travel ticketing platform that lets passengers search routes, browse scheduled voyages, and book ferry tickets online — paired with an admin dashboard for operators to manage their fleet, routes, voyages, and bookings.',
    body: [
      {
        type: 'heading',
        text: 'Background',
      },
      {
        type: 'paragraph',
        text: 'Booking inter-island ferry trips in the Philippines still relied on port queues, phone calls, and manual manifests. Tripket PH set out to bring voyage ticketing online — giving passengers a way to find and book trips in advance, and operators a single place to run their fleet.',
      },
      {
        type: 'heading',
        text: 'Design & Development',
      },
      {
        type: 'paragraph',
        text: 'We delivered the full product — a passenger-facing booking experience and an operator admin dashboard. The core challenge was modeling voyages across vessels, routes, and schedules while keeping booking fast and clear for everyday travelers.',
      },
      {
        type: 'image',
        src: tripketImg,
        alt: 'Tripket PH operator admin dashboard showing revenue, ticket bookings, and pending bookings',
        caption: 'The operator dashboard — revenue, ticket bookings, and voyage activity at a glance.',
      },
      {
        type: 'list',
        items: [
          { bold: 'Route & voyage search: ', text: 'Passengers browse routes and scheduled voyages with real-time availability and pricing.' },
          { bold: 'Booking flow: ', text: 'A streamlined ticket purchase and booking management experience built for mobile.' },
          { bold: 'Fleet management: ', text: 'Operators manage vessels, route catalogues, and scheduled voyages with live load percentages.' },
          { bold: 'Admin dashboard: ', text: 'KPIs, revenue charts, passenger bookings, tickets, and audit logs in one console.' },
        ],
      },
      {
        type: 'heading',
        text: 'Impact',
      },
      {
        type: 'paragraph',
        text: 'Tripket PH moved voyage ticketing off the dock and online, giving passengers advance booking and operators end-to-end visibility into voyages, load, and revenue from a single dashboard.',
      },
    ],
  },
]
