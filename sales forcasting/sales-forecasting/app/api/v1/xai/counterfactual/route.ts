// app/api/v1/xai/counterfactual/route.ts
import { NextResponse } from 'next/server';
import { computeShap, getDealById } from '../../../../../lib/data/mockData';
import { z } from 'zod';

// Expected payload: dealId and any slider parameters (mocked, we just recompute win propensity)
const bodySchema = z.object({
  dealId: z.string(),
  // Example sliders – in a real system they'd affect the model; here we just echo back.
  quoteLatency: z.number().min(0).max(30).optional(),
  sponsorMeetings: z.number().min(0).max(10).optional(),
  discountPct: z.number().min(0).max(100).optional(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parseResult = bodySchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parseResult.error.format() }, { status: 400 });
  }
  const { dealId, quoteLatency, sponsorMeetings, discountPct } = parseResult.data;

  const deal = getDealById(dealId);
  if (!deal) {
    return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
  }

  // Mock counterfactual: simply adjust winPropensity based on simple heuristics
  let newPropensity = deal.winPropensity;
  if (quoteLatency !== undefined) {
    newPropensity += (30 - quoteLatency) * 0.01; // shorter latency improves propensity
  }
  if (sponsorMeetings !== undefined) {
    newPropensity += sponsorMeetings * 0.02;
  }
  if (discountPct !== undefined) {
    newPropensity -= discountPct * 0.001; // higher discount reduces propensity
  }
  newPropensity = Math.max(0, Math.min(1, newPropensity));

  const shapValues = computeShap(dealId);

  return NextResponse.json({
    dealId,
    originalPropensity: deal.winPropensity,
    newPropensity,
    shapValues,
  });
}
