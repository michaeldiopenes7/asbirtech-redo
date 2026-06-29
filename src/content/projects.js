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
      'Beetzee Play is the Philippines’ first “Piso Serye” platform, offering affordable, short-form dramas optimized for vertical mobile viewing. It features a curated selection of fast-paced local and foreign series designed for quick entertainment on the go. The platform is accessible via Maya, GCash, GlobeOne, PalawanPay, and M Lhuillier, and is also available for download on the App Store and Google Play.',
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
      'PlanOut is a user-friendly app designed to make attending both outdoor and indoor sports or activities simple and stress-free. It provides a reliable platform for guests to purchase tickets and track bookings, while empowering organizers to manage everything from ticket tiers to real-time sales. Looking ahead, the platform will expand to include event organizing and accommodation bookings, ensuring a seamless experience nationwide. By streamlining these, PlanOut helps everyone spend less time on paperwork and more time enjoying the event.',
  },
  {
    id: 'tripket',
    variant: 'gold',
    logo: tripketLogo,
    image: tripketCover,
    imagePosition: 'center 25%',
    client: 'Tripket PH',
    tags: ['Travel', 'Booking'],
    title: 'Tripket: Simplifying Island Travel, One Click at a Time',
    description:
      'Tripket PH is a project focused on making boat travel simple for everyone. This platform lets you skip the crowded ticket lines at the pier by booking your ferry trips online. By teaming up, we are making it much easier for people and businesses to move between islands without the stress. It is the perfect way to enjoy a smooth, hassle-free journey across the Philippines.',
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
