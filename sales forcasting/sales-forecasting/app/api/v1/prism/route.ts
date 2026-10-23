// app/api/v1/prism/route.ts
import { NextResponse } from 'next/server';
import { clusters, deals } from '../../../../lib/data/mockData';
import type { Deal } from '../../../../lib/data/schema';
import { z } from 'zod';

// Expected payload: firmographic fields (simplified for demo)
const bodySchema = z.object({
  dealId: z.string(),
  // In a real system we'd accept many firmographic attributes; for mock we just need ID.
});

export async function POST(request: Request) {
  const json = await request.json();
  const parseResult = bodySchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parseResult.error.format() }, { status: 400 });
  }
  const { dealId } = parseResult.data;
  const deal = deals.find((d: Deal) => d.id === dealId);
  if (!deal) {
    return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
  }
  // Assign a random cluster for demo purposes
  const cluster = clusters[Math.floor(Math.random() * clusters.length)];
  deal.clusterId = cluster.id;
  return NextResponse.json({
    dealId,
    clusterId: cluster.id,
    clusterName: cluster.name,
    conversionProb: cluster.conversionProb,
  });
}
