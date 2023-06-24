import bcrypt, { compare } from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials)
       {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }
        const user =await prisma.user.findUnique({
            where:{
                email:credentials.email
            }
        })
        if(!user || !user?.hashedPassword){
            throw new Error('Invalid creadentials')

        }
        const isCorrectPassword=await bcrypt.compare(
            credentials.password,
            user.hashedPassword

        )
        if(!isCorrectPassword){
            throw new Error('Invalid cradientials')
        }
        return user
      },
    }),
  ],
  debug:process.env.NODE_ENV=== 'development',
  session:{
    strategy:'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET
};


const handler=NextAuth(authOptions)

export {handler as GET ,handler as POST} 
