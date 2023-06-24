import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import  {Request} from 'next';

import client from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    
    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        email,  
        name,
        hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error,'REGISTRATION_ERROR');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
