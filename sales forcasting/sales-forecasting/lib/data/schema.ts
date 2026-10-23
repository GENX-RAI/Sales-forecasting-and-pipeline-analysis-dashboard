// lib/data/schema.ts
export interface Deal {
  id: string;
  name: string;
  amount: number; // USD
  stage: 'prospect' | 'qualified' | 'proposal' | 'won' | 'lost';
  winPropensity: number; // 0-1
  hawkesIntensity?: number[]; // time-series points
  clusterId?: string; // PRISM cluster
  shapValues?: Record<string, number>; // feature → contribution
  assignedRepId?: string;
}

export interface Rep {
  id: string;
  name: string;
  capacity: number; // max concurrent deals (FTE units)
  skillScore: number; // 0-1 matching score
}

export interface Cluster {
  id: string;
  name: string;
  conversionProb: number; // baseline P(Y=1|c)
}
