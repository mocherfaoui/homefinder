import { Toaster } from 'react-hot-toast';
import { createTheme, globalCss, NextUIProvider } from '@nextui-org/react';
import { orange } from '@radix-ui/colors';
import { SessionProvider } from 'next-auth/react';

import 'inter-ui/inter.css';

const theme = createTheme({
  type: 'light',
  theme: {
    fonts: {
      sans: "-apple-system, Inter, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
    },
    colors: {
      ...orange,
    },
  },
});
const globalStyles = globalCss({
  '#__next > div:first-child': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  html: {
    scrollPaddingTop: '$28',
    scrollBehavior: 'smooth',
    '@md': {
      scrollPaddingTop: '$32',
    },
  },
  body: {
    scrollbarColor: ' $colors$gray600 $colors$gray300',
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    '&::-webkit-scrollbar': {
      width: '0.7rem',
    },
    '&::-webkit-scrollbar-thumb': {
      bg: '$gray500',
      br: '$md',
    },
  },
});
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  globalStyles();
  return (
    <>
      <NextUIProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NextUIProvider>
      <Toaster position='bottom-right' />
    </>
  );
}

export default MyApp;
