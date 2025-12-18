export interface OracleResponse {
  plantName: string;
  botanicalFact: string;
  meditationSnippet: string;
  moodAlignment: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export enum SectionId {
  HOME = 'home',
  MISSION = 'mission',
  JOURNEYS = 'journeys',
  OFFERINGS = 'offerings',
  ORACLE = 'oracle',
  SCIENCE = 'science',
}
