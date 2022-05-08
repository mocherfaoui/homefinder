import Head from 'next/head';

import Header from './Header';
import { Wrapper } from '../GlobalComponents';

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{`${pageTitle} | HomeFinder`}</title>
      </Head>
      <Header />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
    </>
  );
}
