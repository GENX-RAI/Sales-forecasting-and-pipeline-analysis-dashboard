// app/api/v1/hawkes/route.ts
import { NextResponse } from 'next/server';
import { simulateHawkesIntensity } from '../../../../lib/data/mockData';
import { z } from 'zod';

const querySchema = z.object({
  dealId: z.string(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parseResult = querySchema.safeParse(Object.fromEntries(url.searchParams.entries()));
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid query parameters', details: parseResult.error.format() }, { status: 400 });
  }
  const { dealId } = parseResult.data;
  const intensity = simulateHawkesIntensity(dealId);
  return NextResponse.json({ dealId, intensity });
}
