export type Confederation = 'AFC' | 'CAF' | 'CONCACAF' | 'CONMEBOL' | 'OFC' | 'UEFA';

export interface Team {
  id: string;
  name: string;
  confederation: Confederation;
  pot: 1 | 2 | 3 | 4;
  iso2?: string; // ISO 3166-1 alpha-2 code for flag
  // For Playoff winners that have multiple potential confederations
  avoidConfederations?: Confederation[];
}

export interface Group {
  name: string;
  teams: Team[];
}

export type Pot = Team[];
