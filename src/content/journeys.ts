export interface Journey {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  youtubeUrl: string;
  description: string;
  imageUrl: string;
  views?: string;
}

export const JOURNEYS: Journey[] = [
  {
    id: 'pilot-journey',
    title: 'Sleep While You Learn AI Prompting 🧠🌙 | Subliminal Focus, Clarity & Creativity Overnight',
    subtitle: 'The Botanical Archive',
    duration: '1:25:12',
    youtubeUrl: 'https://www.youtube.com/watch?v=h_r80EWgjqs',
    description: 'Welcome to The Sanctuary of Sleep. Step into a space where Ancient History, Botanical Science, and Biblical narratives converge.',
    imageUrl: 'https://img.youtube.com/vi/h_r80EWgjqs/hqdefault.jpg',
    views: 'New Release'
  },
  {
    id: 'pilot-journey-2',
    title: 'The Sanctuary of Sleep — Pilot Journey',
    subtitle: 'The Botanical Archive',
    duration: '2:04:50',
    youtubeUrl: 'https://www.youtube.com/watch?v=oLSV7Ysm4Ik',
    description: 'Welcome to The Sanctuary of Sleep. Step into a space where Ancient History, Botanical Science, and Biblical narratives converge.',
    imageUrl: 'https://img.youtube.com/vi/oLSV7Ysm4Ik/hqdefault.jpg',
    views: 'New Release'
  },
  {
    id: 'pilot-journey-3',
    title: 'The Sanctuary of Sleep — Pilot Journey',
    subtitle: 'The Botanical Archive',
    duration: '2:04:50',
    youtubeUrl: 'https://www.youtube.com/watch?v=oLSV7Ysm4Ik',
    description: 'Welcome to The Sanctuary of Sleep. Step into a space where Ancient History, Botanical Science, and Biblical narratives converge.',
    imageUrl: 'https://img.youtube.com/vi/oLSV7Ysm4Ik/hqdefault.jpg',
    views: 'New Release'
  },
  {
    id: 'pilot-journey-4',
    title: 'The Sanctuary of Sleep — Pilot Journey',
    subtitle: 'The Botanical Archive',
    duration: '2:04:50',
    youtubeUrl: 'https://www.youtube.com/watch?v=oLSV7Ysm4Ik',
    description: 'Welcome to The Sanctuary of Sleep. Step into a space where Ancient History, Botanical Science, and Biblical narratives converge.',
    imageUrl: 'https://img.youtube.com/vi/oLSV7Ysm4Ik/hqdefault.jpg',
    views: 'New Release'
  }
];