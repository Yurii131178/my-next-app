// middleware.ts
import { NextRequest } from 'next/server';

const privateRoutes = ['/profile'];

export async function middleware(request: NextRequest) {}

export const config = {};
