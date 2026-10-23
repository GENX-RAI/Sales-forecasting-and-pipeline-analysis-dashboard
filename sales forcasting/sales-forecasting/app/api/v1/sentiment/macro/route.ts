// app/api/v1/sentiment/macro/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Mock macro-economic indicators
const macroData = {
  sectorGrowth: [
    { month: 'Jan', value: 1.2 },
    { month: 'Feb', value: 1.3 },
    { month: 'Mar', value: 1.1 },
    { month: 'Apr', value: 1.4 },
    { month: 'May', value: 1.5 },
    { month: 'Jun', value: 1.2 },
  ],
  inflation: 4.2,
  interestRate: 3.7,
};

const querySchema = z.object({}); // no query params needed for mock

export async function GET(request: Request) {
  const parseResult = querySchema.safeParse({});
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  return NextResponse.json(macroData);
}
