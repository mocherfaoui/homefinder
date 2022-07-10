import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import {
  AtSymbolIcon,
  LoginIcon,
  MailOpenIcon,
} from '@heroicons/react/outline';
import { Button, Grid, Input, Modal, Text } from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth/next';
import { getProviders, getSession, signIn } from 'next-auth/react';

import { FlexText, HeroIcon, Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';

import { authOptions } from '../api/auth/[...nextauth]';

const MagicLinkModal = ({ show = false, email = '' }) => {
  if (!show) return null;

  return (
    <Modal open={show} blur preventClose>
      <Modal.Header>
        <FlexText h3>
          <HeroIcon
            css={{
              '& svg': {
                size: '$10',
              },
            }}
          >
            <MailOpenIcon />
          </HeroIcon>
          Confirm your email
        </FlexText>
      </Modal.Header>
      <Modal.Body>
        <Text size='1.1rem' css={{ ta: 'center' }}>
          We emailed a magic link to <strong>{email}</strong>. Check your inbox
          and click the link in the email to login.
        </Text>
      </Modal.Body>
    </Modal>
  );
};

export default function SignIn({ providers }) {
  const router = useRouter();
  const emailFromQuery = router.query.email;
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let intervalId, redirecting;

    if (showModal) {
      setInterval(async () => {
        const session = await getSession();
        if (session && !redirecting) {
          // User connected using the magic link -> redirect him/her
          redirecting = true;
          router.push(router.query?.callbackUrl || '/');
        }
      }, 1000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [showModal, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    let toastId;
    try {
      toastId = toast.loading('Loading...', { position: 'top-center' });
      setDisabled(true);
      // Perform sign in
      const { error } = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      toast.success('Magic link successfully sent', {
        id: toastId,
        position: 'top-center',
      });
      setShowModal(true);
    } catch (error) {
      toast.error('Unable to send magic link', {
        id: toastId,
        position: 'top-center',
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Layout pageTitle='Signin Page'>
      <Wrapper css={{ mt: '$7', '@md': { px: '26rem' } }}>
        <Grid.Container>
          <Grid xs={12} css={{ mb: '$5' }}>
            <Text h3>Welcome Back</Text>
          </Grid>
          <Grid xs={12}>
            <Grid.Container
              as='form'
              onSubmit={handleSignIn}
              gap={2.5}
              css={{ px: 0 }}
            >
              <Grid xs={12}>
                <Input
                  aria-label='email'
                  bordered
                  fullWidth
                  type='email'
                  placeholder='Email'
                  initialValue={emailFromQuery}
                  autoFocus={emailFromQuery ?? false}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled}
                  contentLeft={<AtSymbolIcon />}
                />
              </Grid>
              <Grid xs={12}>
                <Button
                  css={{ w: '100%' }}
                  type='submit'
                  icon={
                    <HeroIcon>
                      <LoginIcon />
                    </HeroIcon>
                  }
                >
                  Sign in
                </Button>
              </Grid>
            </Grid.Container>
          </Grid>

          {Object.values(providers).map((provider) => (
            <Grid xs={12} key={provider.name}>
              <Button
                css={{ w: '100%' }}
                ghost
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                disabled={disabled}
                icon={
                  <HeroIcon>
                    <AiOutlineGoogle />
                  </HeroIcon>
                }
              >
                Sign in with {provider.name}
              </Button>
            </Grid>
          ))}
        </Grid.Container>
      </Wrapper>
      <MagicLinkModal show={showModal} email={email} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  delete providers.email;
  return {
    props: { providers },
  };
}
