// app/api/v1/optimizer/allocate/route.ts
import { NextResponse } from 'next/server';
import { deals, reps, getRepUtilization } from '../../../../../lib/data/mockData';
import { z } from 'zod';

// Simplified payload – in real world we’d accept constraints etc.
const bodySchema = z.object({
  // optional maxRevenue per rep, for demo we ignore.
  maxDealsPerRep: z.number().int().min(1).max(20).optional(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parseResult = bodySchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parseResult.error.format() }, { status: 400 });
  }
  const { maxDealsPerRep = 5 } = parseResult.data;

  // Very naive greedy allocation: assign deals to the least‑loaded rep with capacity.
  const allocation: Record<string, string> = {};
  const repLoads = getRepUtilization().reduce((acc: Record<string, number>, { rep, assigned }: { rep: any; assigned: number }) => {
    acc[rep.id] = assigned;
    return acc;
  }, {} as Record<string, number>);
  // Sort reps by current load ascending.
  const sortedReps = [...reps].sort((a, b) => (repLoads[a.id] ?? 0) - (repLoads[b.id] ?? 0));

  for (const deal of deals) {
    const availableRep = sortedReps.find((r) => (repLoads[r.id] ?? 0) < Math.min(r.capacity, maxDealsPerRep));
    if (availableRep) {
      allocation[deal.id] = availableRep.id;
      repLoads[availableRep.id] = (repLoads[availableRep.id] ?? 0) + 1;
    }
  }
  return NextResponse.json({ allocation });
}
