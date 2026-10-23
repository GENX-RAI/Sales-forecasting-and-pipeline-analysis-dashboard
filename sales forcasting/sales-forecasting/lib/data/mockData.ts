// Large dummy dataset for sales forecasting project
import { Deal, Rep, Cluster } from './schema';

// Generate a range of ids
const id = (prefix: string, i: number) => `${prefix}${i}`;

export const deals: Deal[] = Array.from({ length: 50 }, (_, i) => ({
  id: id('d', i + 1),
  name: `Deal ${i + 1}`,
  amount: Math.floor(Math.random() * 500_000) + 50_000,
  stage: (['prospect', 'qualified', 'proposal', 'won', 'lost'] as const)[i % 5],
  winPropensity: parseFloat((Math.random() * 0.9 + 0.1).toFixed(2)),
}));

export const reps: Rep[] = Array.from({ length: 20 }, (_, i) => ({
  id: id('r', i + 1),
  name: `Rep ${i + 1}`,
  capacity: Math.floor(Math.random() * 8) + 2,
  skillScore: parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
}));

export const clusters: Cluster[] = Array.from({ length: 10 }, (_, i) => ({
  id: id('c', i + 1),
  name: `Cluster ${String.fromCharCode(65 + i)}`,
  conversionProb: parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
}));

// Helper utilities (similar to existing mockData)
export const getRepUtilization = () =>
  reps.map(rep => ({
    rep,
    assigned: Math.floor(Math.random() * rep.capacity),
  }));

export const simulateHawkesIntensity = (dealId: string) => {
  const hash = dealId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (hash % 100) / 100;
};

export const getDealById = (dealId: string): Deal | undefined =>
  deals.find(d => d.id === dealId);

export const computeShap = (dealId: string) => ({
  amount: Math.random() * 0.5,
  winPropensity: Math.random() * 0.5,
  clusterId: Math.random() * 0.5,
});
