import { NextResponse } from 'next/server';
import { api } from '../api';

export async function GET() {
  const { data } = await api('/categories');

  if (data) {
    return NextResponse.json(data);
  }
  return NextResponse.json(
    { error: 'Failed to fetch categories' },
    { status: 500 },
  );
}
