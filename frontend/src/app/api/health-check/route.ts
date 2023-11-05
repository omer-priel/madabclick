import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  return NextResponse.json({
    Name: 'forntend',
    health: true,
  });
}
