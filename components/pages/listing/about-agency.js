import { useState } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  ChatIcon,
  ChevronRightIcon,
  PhoneIcon,
} from '@heroicons/react/outline';
import {
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Spacer,
  Text,
  User,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { HeroIcon, TextTruncate } from '@/components/shared';

import { fetcher } from '@/utils/fetcher';

const SendMessageModal = dynamic(() =>
  import('@/components/shared').then((module) => module.SendMessageModal)
);

export default function AboutAgency({ listing }) {
  const { data: session, status } = useSession();

  const { data: discussionWithAgency } = useSWR(
    `/api/discussion/${listing.owner.id}`,
    fetcher
  );

  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const agencyOwnerId = listing.owner.ownerId;
  const isAgencyAccount = session?.user?.agencyId;

  const closeModal = () => {
    setSendMessageModal(false);
  };

  return (
    <Grid xs={12} sm={12} css={{ maxH: '265px' }}>
      <Card variant='bordered'>
        <Card.Header>
          <Text h3 weight='semibold' css={{ m: 0 }}>
            <NextLink href={`/agency/${listing?.owner.id}/listings`} passHref>
              <Link underline color='text'>
                Agency Profile
                <HeroIcon css={{ ml: '$2' }}>
                  <ChevronRightIcon />
                </HeroIcon>
              </Link>
            </NextLink>
          </Text>
        </Card.Header>
        <Divider />
        <Card.Body css={{ justifyContent: 'space-between' }}>
          <User
            /* title={dayjs(listing?.owner.createdAt).format(
        'ddd[,] MMMM Do[,] YYYY hh[:]mm A z'
      )} */
            name={listing?.owner.name}
            src={listing?.owner.logo}
            size='lg'
            css={{ pl: 0 }}
            description={`Member since ${dayjs(listing?.owner.createdAt).format(
              'MMM DD[,] YYYY'
            )}`}
          />
          <TextTruncate css={{ my: '$5' }}>
            {listing?.owner.description}
          </TextTruncate>
        </Card.Body>
        <Divider />
        <Card.Footer css={{ jc: 'center' }}>
          <Grid.Container css={{ p: 0 }}>
            <Grid xs css={{ py: 0 }}>
              <Button
                css={{ w: '100%' }}
                auto
                href={`tel:${listing?.owner.phone}`}
                as='a'
                icon={
                  <HeroIcon>
                    <PhoneIcon />
                  </HeroIcon>
                }
              >
                Call
              </Button>
            </Grid>
            <Spacer x={0.5} />
            {(discussionWithAgency?.length === 0 ||
              status === 'unauthenticated') &&
              !isAgencyAccount &&
              !messageSent && (
                <Grid xs={6} css={{ py: 0 }}>
                  <Button
                    ghost
                    css={{ w: '100%' }}
                    icon={
                      <HeroIcon>
                        <ChatIcon />
                      </HeroIcon>
                    }
                    auto
                    onClick={() => setSendMessageModal(true)}
                  >
                    Chat
                  </Button>
                  <SendMessageModal
                    visible={sendMessageModal}
                    onClose={closeModal}
                    agencyOwnerId={agencyOwnerId}
                    session={session}
                    listing={listing}
                    setMessageSent={setMessageSent}
                  />
                </Grid>
              )}
            {(discussionWithAgency?.length > 0 || messageSent) && (
              <Grid xs={6} css={{ py: 0 }}>
                <NextLink href='/my/discussions' passHref>
                  <Button
                    as='a'
                    ghost
                    css={{ w: '100%' }}
                    icon={
                      <HeroIcon>
                        <ChatIcon />
                      </HeroIcon>
                    }
                    auto
                  >
                    Chat
                  </Button>
                </NextLink>
              </Grid>
            )}
            {isAgencyAccount && (
              <Grid xs={6} css={{ py: 0 }}>
                <Button
                  ghost
                  css={{ w: '100%' }}
                  icon={
                    <HeroIcon>
                      <ChatIcon />
                    </HeroIcon>
                  }
                  auto
                  disabled
                >
                  Chat
                </Button>
              </Grid>
            )}
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
