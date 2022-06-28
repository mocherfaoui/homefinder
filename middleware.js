export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/my/:path*', '/listing/new', '/agency/new'],
};
