// backend mock data and utilities
import { Deal, Rep, Cluster } from './schema';

export const deals: Deal[] = [
  { id: 'd1', name: 'Deal One', amount: 100000, stage: 'prospect', winPropensity: 0.6 },
  { id: 'd2', name: 'Deal Two', amount: 200000, stage: 'qualified', winPropensity: 0.4 },
  { id: 'd3', name: 'Deal Three', amount: 150000, stage: 'proposal', winPropensity: 0.5 },
];

export const reps: Rep[] = [
  { id: 'r1', name: 'Rep One', capacity: 5, skillScore: 0.8 },
  { id: 'r2', name: 'Rep Two', capacity: 5, skillScore: 0.6 },
  { id: 'r3', name: 'Rep Three', capacity: 5, skillScore: 0.9 },
];

export const clusters: Cluster[] = [
  { id: 'c1', name: 'Cluster A', conversionProb: 0.7 },
  { id: 'c2', name: 'Cluster B', conversionProb: 0.5 },
];

export function getRepUtilization() {
  // Return array of utilization objects for each rep
  return reps.map((rep) => ({ rep, assigned: Math.floor(Math.random() * rep.capacity) }));
}

export function simulateHawkesIntensity(dealId: string) {
  const hash = dealId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (hash % 100) / 100;
}

export function getDealById(dealId: string): Deal | undefined {
  return deals.find((d) => d.id === dealId);
}

export function computeShap(dealId: string) {
  return {
    amount: Math.random() * 0.5,
    winPropensity: Math.random() * 0.5,
    clusterId: Math.random() * 0.5,
  };
}
