import { NextResponse } from 'next/server';

import { getContents } from '@/lib/db/requests';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const contents = await getContents();
  return NextResponse.json(contents);
}
