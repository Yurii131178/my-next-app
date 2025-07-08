// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiRes = await api.post('auth/register', body);

  if (apiRes) {
    return NextResponse.json(apiRes.data);
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
