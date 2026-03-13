import { NextResponse } from 'next/server';
import { MOCK_SALES_DATA } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (year) {
    const yearNum = parseInt(year);
    if (MOCK_SALES_DATA[yearNum]) {
      return NextResponse.json(MOCK_SALES_DATA[yearNum]);
    }
    return NextResponse.json({ error: 'Year not found' }, { status: 404 });
  }

  return NextResponse.json(MOCK_SALES_DATA);
}
