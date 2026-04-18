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
      'Built a scalable video streaming platform with subscription management, content delivery, and mobile-first experience for a growing audience.',
  },
  {
    id: 'planout',
    variant: 'ember',
    logo: planoutLogo,
    client: 'PlanOut',
    tags: ['Ticketing', 'Web App'],
    title: 'Smarter way to sell tickets, built for event organizers.',
    description:
      'End-to-end ticketing system with real-time inventory, QR check-in, and organizer dashboards that replaced a legacy spreadsheet workflow.',
  },
  {
    id: 'korte',
    variant: 'gold',
    logo: korteLogo,
    client: 'Korte Philippines',
    tags: ['Marketplace', 'UX / UI'],
    title: 'Discover & book sports courts nationwide.',
    description:
      'Court discovery and booking platform with availability calendars, venue management tools, and a seamless mobile booking flow.',
  },
]
