import { NextResponse } from 'next/server';

import { getContentsInfo } from '@/lib/db/requests';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const contents = await getContentsInfo();
  return NextResponse.json(contents);
}
