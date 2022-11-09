import Document, { Head, Html, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

const fontVariants = ['Regular', 'Medium', 'SemiBold', 'Bold'];

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {CssBaseline.flush()}
          {fontVariants.map((fontVariant, index) => (
            <link
              key={index}
              rel='preload'
              href={`/assets/fonts/Inter-${fontVariant}.woff2`}
              as='font'
              type='font/woff2'
              crossOrigin='anonymous'
            />
          ))}
          <script
            async
            defer
            data-website-id='db90c8d1-4d5a-4c66-a14d-860633f5b61b'
            src='https://umami.cherfaoui.dev/umami.js'
            data-cache='true'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
