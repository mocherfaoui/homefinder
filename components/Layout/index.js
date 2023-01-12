import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from './Footer';
import Header from './Header';
import { MainWrapper } from '../shared/shared-components';

export default function Layout({ children, pageTitle }) {
  const router = useRouter();
  const { pathname } = router;
  const isDiscussionsPage = pathname === '/my/discussions';
  return (
    <>
      <Head>
        <title>{`${pageTitle} | HomeFinder`}</title>
      </Head>
      <Header />
      <MainWrapper>
        <main>{children}</main>
      </MainWrapper>
      {!isDiscussionsPage && <Footer />}
    </>
  );
}
