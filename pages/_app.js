import { Toaster } from 'react-hot-toast';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

import 'inter-ui/inter.css';

const theme = createTheme({
  type: 'light',
  theme: {
    fonts: {
      sans: "-apple-system, Inter, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
    },
  },
});
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <NextUIProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NextUIProvider>
      <Toaster />
    </>
  );
}

export default MyApp;
