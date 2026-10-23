// app/api/v1/call-sentiment/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Mock function to compute sentiment from a transcript (placeholder)
const computeSentiment = (transcript: string) => {
  // Very simple mock: count positive/negative words
  const positives = ['good', 'great', 'awesome', 'happy', 'satisfied'];
  const negatives = ['bad', 'terrible', 'unhappy', 'problem', 'issue'];
  const words = transcript.toLowerCase().split(/\s+/);
  const score =
    (words.filter((w) => positives.includes(w)).length -
      words.filter((w) => negatives.includes(w)).length) /
    Math.max(words.length, 1);
  // Normalize to 0‑1 range
  return Math.max(0, Math.min(1, (score + 1) / 2));
};

// Re‑use the mock macro‑economic data from the existing route
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

// Expected payload from the frontend / Voice AI component
const bodySchema = z.object({
  transcript: z.string().min(1, { message: 'Transcript is required' }),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parseResult = bodySchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parseResult.error.format() }, { status: 400 });
  }

  const { transcript } = parseResult.data;
  const sentimentScore = computeSentiment(transcript);

  return NextResponse.json({
    sentimentScore,
    macroData,
  });
}
