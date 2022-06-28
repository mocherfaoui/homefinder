import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import NextLink from 'next/link';
import { ArrowSmLeftIcon } from '@heroicons/react/outline';
import {
  Button,
  Card,
  Divider,
  Grid,
  Loading,
  Text,
  Textarea,
} from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { getListingRatings, getListingRatingsAvg } from '@/lib/db';
import prisma from '@/lib/prisma';

import {
  HeroIcon,
  RatingContainer,
  Wrapper,
} from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import RatingCard from '@/components/RatingCard';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { fetcher } from '@/utils/fetcher';

export default function RatingsPage({
  listingData,
  listingRatings,
  listingRatingsAvg,
}) {
  const { data: listingRatingsData, mutate } = useSWR(
    `/api/listing/${listingData.id}/ratings`,
    fetcher,
    { fallbackData: listingRatings }
  );
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const userNotLoggedIn = status === 'unauthenticated';
  const handleRatingChange = (rate) => {
    setRating(rate);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const newRating = { rating: rating / 20, comment };
      await fetch(`/api/listing/${listingData.id}/rating`, {
        method: 'POST',
        body: JSON.stringify(newRating),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await mutate();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setComment('');
      setRating(0);
    }
  };

  return (
    <Layout pageTitle={`${listingData.title}'s Ratings`}>
      <Wrapper css={{ '@md': { px: '$44' } }}>
        <Grid.Container gap={2} css={{ px: 0 }}>
          <Grid
            xs={12}
            sm={3.5}
            css={{
              '& a': {
                borderColor: '$gray300',
              },
            }}
          >
            <NextLink href={`/listing/${listingData.id}`} passHref>
              <Button
                as='a'
                bordered
                color='text'
                auto
                icon={
                  <HeroIcon>
                    <ArrowSmLeftIcon />
                  </HeroIcon>
                }
                css={{ w: '100%', h: '100%' }}
              >
                Back to listing details
              </Button>
            </NextLink>
          </Grid>
          <Grid xs={12} sm={8.5}>
            <Card variant='bordered'>
              <Card.Body css={{ p: '$sm' }}>
                <Grid.Container
                  alignItems='center'
                  css={{
                    gap: '$4',
                    '@xsMax': {
                      '& > div': {
                        jc: 'center',
                      },
                    },
                  }}
                >
                  <Grid xs={12} sm={4}>
                    <Text size='1.1rem'>
                      {listingRatingsAvg?._count.rating} customer{' '}
                      {listingRatingsAvg?._count.rating > 1
                        ? 'reviews'
                        : 'review'}
                    </Text>
                  </Grid>
                  <Grid
                    xs={12}
                    sm
                    css={{
                      '@xsMax': {
                        '& > div': {
                          jc: 'center',
                        },
                      },
                    }}
                  >
                    <Grid.Container alignItems='center' css={{ gap: '$2' }}>
                      <Grid xs={7} sm={5.5}>
                        <RatingContainer>
                          <Rating
                            readonly
                            size='30'
                            initialValue={listingRatingsAvg?._avg.rating}
                            allowHalfIcon
                          />
                        </RatingContainer>
                      </Grid>
                      <Grid xs={4} sm>
                        <Text span size='1.1rem'>
                          <b>
                            {listingRatingsAvg?._avg?.rating?.toFixed(1) ??
                              '0.0'}
                          </b>{' '}
                          out of 5
                        </Text>
                      </Grid>
                    </Grid.Container>
                  </Grid>
                </Grid.Container>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Card variant='bordered'>
              <Card.Body css={{ p: '$sm' }}>
                <Grid.Container css={{ p: 0 }} gap={2}>
                  {session?.user?.agencyId ? (
                    <Grid xs={12}>
                      <Text size='1.1rem' weight='medium'>
                        Agency accounts cannot leave ratings.
                      </Text>
                    </Grid>
                  ) : (
                    <>
                      <Grid
                        xs={12}
                        css={{
                          ai: 'center',
                          gap: '$3',
                        }}
                      >
                        <Text size='1.1rem' weight='medium'>
                          Your rating:
                        </Text>
                        <RatingContainer>
                          <Rating
                            onClick={handleRatingChange}
                            size='32'
                            ratingValue={rating}
                            transition
                            allowHalfIcon
                            readonly={userNotLoggedIn}
                          />
                        </RatingContainer>
                      </Grid>
                      <Grid xs={12}>
                        <Grid.Container
                          as='form'
                          css={{ gap: '$7' }}
                          onSubmit={handleCommentSubmit}
                        >
                          <Grid xs={12}>
                            <Textarea
                              aria-label='review'
                              placeholder='Write a review'
                              fullWidth
                              onChange={(e) => setComment(e.target.value)}
                              disabled={userNotLoggedIn}
                              value={comment}
                            />
                          </Grid>
                          <Grid xs={12}>
                            <Button
                              ghost
                              disabled={
                                submitting || userNotLoggedIn || !comment
                              }
                              auto
                              type='submit'
                            >
                              {submitting ? (
                                <Loading type='points' color='currentColor' />
                              ) : (
                                'Post'
                              )}
                            </Button>
                          </Grid>
                        </Grid.Container>
                      </Grid>
                    </>
                  )}
                  <Grid xs={12}>
                    <Divider />
                  </Grid>
                  {listingRatingsData.length === 0 && (
                    <Grid xs={12} justify='center' css={{ py: '$20' }}>
                      <Text size='1.5rem' weight='semibold'>
                        This listing has no ratings.
                      </Text>
                    </Grid>
                  )}
                  {!!listingRatingsData?.length && (
                    <Grid xs={12}>
                      <Grid.Container css={{ gap: '$8' }}>
                        {listingRatingsData?.map((rating) => (
                          <Grid key={rating.id} xs={12}>
                            <RatingCard listingRating={rating} />
                          </Grid>
                        ))}
                      </Grid.Container>
                    </Grid>
                  )}
                </Grid.Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Wrapper>
    </Layout>
  );
}
export const getServerSideProps = async ({ params, req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const listingData = await prisma.listing.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
    },
  });
  const { listingRatings } = await getListingRatings(params.id);
  const { listingRatingsAvg } = await getListingRatingsAvg(params.id);
  return {
    props: {
      session,
      listingRatings,
      listingRatingsAvg,
      listingData: JSON.parse(JSON.stringify(listingData)),
    },
  };
};
