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
    title: 'Streaming platform for mobile miniseries.',
    description:
      'Built a scalable video streaming platform with subscription management, content delivery, and mobile-first experience for a growing audience of independent film lovers across Southeast Asia.',
    body: [
      {
        type: 'heading',
        text: 'The Challenge',
      },
      {
        type: 'paragraph',
        text: 'BeetzeePLAY needed a streaming platform purpose-built for short-form mobile miniseries — not an adaptation of a desktop product. Existing solutions were too heavy, too expensive, and not designed for the scroll-first behavior of mobile audiences.',
      },
      {
        type: 'paragraph',
        text: 'The team also needed to manage a growing library of independent Filipino content with flexible subscription tiers, per-episode unlocks, and a creator revenue-sharing model.',
      },
      {
        type: 'heading',
        text: 'What We Built',
      },
      {
        type: 'list',
        items: [
          { bold: 'Mobile-first player: ', text: 'Custom video player optimized for vertical and horizontal orientations with adaptive bitrate streaming.' },
          { bold: 'Subscription engine: ', text: 'Tiered plans with trial periods, per-episode purchases, and promo code support.' },
          { bold: 'Creator dashboard: ', text: 'Upload pipeline, analytics, and payout tracking for independent producers.' },
          { bold: 'Content CMS: ', text: 'Internal tooling for metadata management, episode scheduling, and thumbnail generation.' },
        ],
      },
      {
        type: 'heading',
        text: 'Outcome',
      },
      {
        type: 'paragraph',
        text: 'The platform launched with 12 original series and onboarded over 8,000 subscribers in the first two months. Average session length exceeded industry benchmarks by 34%, driven by the episode-unlock mechanic that encouraged binge progression without full subscription commitment.',
      },
    ],
  },
  {
    id: 'planout',
    variant: 'ember',
    logo: planoutLogo,
    client: 'PlanOut',
    tags: ['Ticketing', 'Web App'],
    title: 'Smarter way to sell tickets, built for event organizers.',
    description:
      'End-to-end ticketing system with real-time inventory, QR check-in, and organizer dashboards that replaced a legacy spreadsheet workflow for mid-size event companies.',
    body: [
      {
        type: 'heading',
        text: 'The Problem',
      },
      {
        type: 'paragraph',
        text: 'PlanOut was managing ticket sales for concerts, corporate events, and community gatherings using a combination of Google Sheets, manual bank transfers, and WhatsApp confirmations. As events scaled past 500 attendees, the cracks became impossible to ignore — overselling, missed check-ins, and zero real-time visibility.',
      },
      {
        type: 'heading',
        text: 'Our Approach',
      },
      {
        type: 'paragraph',
        text: 'We built a unified platform that handles the entire event lifecycle from creation to post-event reporting. The architecture was designed around real-time inventory so that sold-out status propagates instantly across all sales channels.',
      },
      {
        type: 'list',
        items: [
          { bold: 'Event builder: ', text: 'Drag-and-drop seat maps, ticket tier configuration, and promo code management.' },
          { bold: 'Payment integration: ', text: 'Local payment gateways including GCash, Maya, and major credit cards.' },
          { bold: 'QR check-in app: ', text: 'Offline-capable mobile scanner with sync queue for venue dead zones.' },
          { bold: 'Organizer analytics: ', text: 'Live sales dashboard, demographic breakdown, and post-event CSV exports.' },
        ],
      },
      {
        type: 'heading',
        text: 'Results',
      },
      {
        type: 'paragraph',
        text: 'PlanOut processed over 14,000 tickets in its first quarter on the platform. Check-in time per attendee dropped from an average of 45 seconds to under 8 seconds. The operations team reduced event-day headcount by 40% while handling larger crowds.',
      },
    ],
  },
  {
    id: 'korte',
    variant: 'gold',
    logo: korteLogo,
    client: 'Korte Philippines',
    tags: ['Marketplace', 'UX / UI'],
    title: 'Discover & book sports courts nationwide.',
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
