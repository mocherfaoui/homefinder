import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import nodemailer from 'nodemailer';
import path from 'path';

import prisma from '@/lib/prisma';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = async ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate = Handlebars.compile(emailFile);
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `"HomeFinder" ${process.env.EMAIL_FROM}`,
        to: identifier,
        subject: 'Your sign-in link for HomeFinder',
        html: emailTemplate({
          base_url: process.env.NEXTAUTH_URL,
          signin_url: url,
          email: identifier,
        }),
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/auth/signin' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 1 month
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        const user = await prisma.user.findUnique({
          where: { id: token.uid },
          select: {
            name: true,
            image: true,
            agencies: {
              select: {
                id: true,
              },
            },
          },
        });
        session.user.name = user.name;
        session.user.image = user.image;
        session.user.id = token?.uid;
        session.user.agencyId = user.agencies[0]?.id ?? null;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user?.id;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
