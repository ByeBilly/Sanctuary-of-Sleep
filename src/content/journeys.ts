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
      id: 'cedar-lebanon',
      title: 'The Cedar of Lebanon',
      subtitle: 'Strength in Rest',
      duration: '2:00:00',
      youtubeUrl: 'https://youtu.be/esrqK_V1kPs',
      description: 'Journey back to the ancient mountains. In this 2-hour guided sleep narrative, we explore the biblical strength of the Cedar tree. Designed to lower cortisol and ground your nervous system in the stability of deep roots.',
      imageUrl: 'https://img.youtube.com/vi/esrqK_V1kPs/maxresdefault.jpg',
      views: 'New Release'
    },
    {
      id: 'hyssop',
      title: 'Hyssop: The Cleansing Rain',
      duration: '1:30:00',
      youtubeUrl: 'https://www.youtube.com/watch?v=-WHcDvgj0oM',
      description: 'Wash away the day\'s mental clutter with the ancient herb of purification.',
      imageUrl: 'https://img.youtube.com/vi/-WHcDvgj0oM/maxresdefault.jpg',
      views: '15k views'
    },
    {
      id: 'frankincense',
      title: 'Frankincense & Gold',
      duration: '1:45:00',
      youtubeUrl: 'https://youtu.be/p1oppk1y5fA',
      description: 'A resinous soundscape to slow your breathing and evoke sacred calm.',
      imageUrl: 'https://img.youtube.com/vi/p1oppk1y5fA/maxresdefault.jpg',
      views: '22k views'
    },
    {
      id: 'lily',
      title: 'The Lily of the Valley',
      duration: '2:00:00',
      youtubeUrl: 'https://youtu.be/TLfGbHnmb9A',
      description: 'Gentle whispers for the anxious heart. Soften into sleep.',
      imageUrl: 'https://img.youtube.com/vi/TLfGbHnmb9A/maxresdefault.jpg',
      views: '18k views'
    }
  ];