import { getAccessToken } from '../node_modules/@auth0/nextjs-auth0/dist/client';
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth0 } from './auth0';

export async function GET(req: NextRequest) {
  const auth0 = new Auth0Client();
  const session = await new Auth0Client().getAccessToken();
  const accessToken = session?.token;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}

