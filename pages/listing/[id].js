import { useEffect, useState } from 'react';
import { BiBath, BiBed, BiExpand } from 'react-icons/bi';
import { MdOutlineLocationOn } from 'react-icons/md';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  ChatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  HomeIcon,
  PhoneIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import {
  Button,
  Card,
  Divider,
  Grid,
  Image,
  Text,
  User,
} from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import 'swiper/css';
import 'swiper/css/pagination';

import 'photoswipe/style.css';

import { getListingRatingsAvg } from '@/lib/db';
import prisma from '@/lib/prisma';

import {
  ArrowIcon,
  FlexText,
  HeroIcon,
  ImageGalleryContainer,
  PropertyFeatures,
  TextTruncate,
  Wrapper,
} from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import ListingsCarousel from '@/components/ListingsCarousel';
import RatingCard from '@/components/RatingCard';
import TopButtons from '@/components/TopButtons';

import dayjs from '@/utils/dayjs';
import { fetcher } from '@/utils/fetcher';
import timeAgo from '@/utils/timeAgo';

import { authOptions } from '../api/auth/[...nextauth]';

const SendMessageModal = dynamic(() => import('@/components/SendMessageModal'));

export default function ListingPage({
  listing,
  listingRatingsAvg,
  listingRatings,
  recommendedListings,
  moreFromAgency,
  discussionWithAgency,
}) {
  const { data: session, status } = useSession();
  const { data: listingViews, isLoading } = useSWR(
    `/api/listing/${listing.id}/view`,
    fetcher,
    {
      fallbackData: listing?.views?.totalViews,
    }
  );
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const listingUrl = typeof document !== 'undefined' && document.location.href;
  const shareDetails = { url: listingUrl, title: listing?.title };
  const scrollToRatings = () => {
    const ratingsCard = document.getElementById('ratings-card');
    ratingsCard.scrollIntoView({ behavior: 'smooth' });
  };
  const agencyOwnerId = listing.owner.ownerId;
  const isAgencyAccount = session?.user?.agencyId;
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#test-gallery',
      children: 'a',
      showHideAnimationType: 'fade',
      pswpModule: () => import('photoswipe'),
      preload: [1, 3],
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);
  useEffect(() => {
    async function collectView() {
      await fetch(`/api/listing/${listing?.id}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    }
    let timoutId = setTimeout(() => collectView(), 1500);
    return () => clearTimeout(timoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setSendMessageModal(false);
  };
  return (
    <Layout pageTitle={listing?.title}>
      <style>
        {`
        .swiper-pagination{
          width:auto;
          height:fit-content;
          top:8px;
          left:8px;
        }
        `}
      </style>
      <Wrapper>
        <Card
          variant='bordered'
          css={{ p: '$sm', '@xsMax': { p: 0, border: 0 } }}
        >
          <Card.Body css={{ p: 0 }}>
            <Grid.Container css={{ position: 'relative' }}>
              {/* don't show navigation buttons if images count is lower than images per view */}
              {listing?.images?.length > 2 && (
                <>
                  <ArrowIcon as='div' arrow='left'>
                    <FlexText span className='image-swiper-button-prev'>
                      <HeroIcon>
                        <ChevronLeftIcon />
                      </HeroIcon>
                    </FlexText>
                  </ArrowIcon>
                  <ArrowIcon as='div' arrow='right'>
                    <FlexText span className='image-swiper-button-next'>
                      <HeroIcon>
                        <ChevronRightIcon />
                      </HeroIcon>
                    </FlexText>
                  </ArrowIcon>
                </>
              )}
              <Grid xs={12}>
                <ImageGalleryContainer
                  className='pswp-gallery'
                  id='test-gallery'
                  css={{ w: '100%' }}
                >
                  <Swiper
                    pagination={{
                      type: 'custom',
                      renderCustom: (swiper, current, total) =>
                        `${current} / ${total}`,
                    }}
                    slidesPerView={2}
                    spaceBetween={8}
                    navigation={{
                      nextEl: '.image-swiper-button-next',
                      prevEl: '.image-swiper-button-prev',
                      disabledClass: 'swiper-button-disabled',
                    }}
                    modules={[Navigation, Pagination]}
                    className='mySwiper'
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                    }}
                  >
                    {listing?.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <a
                          href={image}
                          data-pswp-width={960}
                          data-pswp-height={640}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <Image
                            src={image}
                            objectFit='cover'
                            height={300}
                            css={{ br: '$sm' }}
                            alt='listing image'
                          />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </ImageGalleryContainer>
              </Grid>
            </Grid.Container>

            <Grid.Container css={{ mt: '$9' }}>
              <Grid.Container alignItems='baseline'>
                <Grid xs={8} sm={8}>
                  <TextTruncate
                    weight='semibold'
                    css={{ '@md': { fs: '2rem' }, fs: '1.5rem' }}
                  >
                    {listing?.title}
                  </TextTruncate>
                </Grid>
                <Grid xs sm justify='flex-end'>
                  <TopButtons
                    listingId={listing?.id}
                    listingOwnerId={listing?.ownerId}
                    shareDetails={shareDetails}
                    redirectUrl='/'
                  />
                </Grid>
                <Grid xs={12} css={{ mt: '$2' }}>
                  <FlexText
                    css={{
                      gap: '$3',
                      cursor: 'pointer',
                    }}
                    onClick={scrollToRatings}
                  >
                    <HeroIcon css={{ color: '$yellow500' }}>
                      <StarIcon />
                    </HeroIcon>
                    {listingRatingsAvg?._avg?.rating?.toFixed(1) ?? '0.0'}
                    <Text size={10} span css={{ m: 0 }}>
                      &bull;
                    </Text>
                    {`${listingRatingsAvg?._count.rating} ${
                      listingRatingsAvg?._count.rating > 1
                        ? 'reviews'
                        : 'review'
                    }`}
                  </FlexText>
                </Grid>
              </Grid.Container>
            </Grid.Container>
            <Grid.Container css={{ mt: '$7' }}>
              <Grid.Container
                css={{
                  '@xsMax': {
                    gap: '$7',
                  },
                }}
              >
                <Grid xs={12} sm={6}>
                  <FlexText
                    size='1.7rem'
                    weight='bold'
                    css={{ wordBreak: 'break-all' }}
                  >
                    ${Number(listing?.price).toLocaleString()}
                    {listing?.status === 'for-rent' && (
                      <Text span size={15} color='$gray700'>
                        /month
                      </Text>
                    )}
                  </FlexText>
                </Grid>
                <Grid
                  xs={12}
                  sm={6}
                  css={{
                    gap: '$9',
                    jc: 'flex-end',
                    '@xsMax': {
                      jc: 'space-between!important',
                    },
                  }}
                >
                  <FlexText>
                    <HeroIcon>
                      <EyeIcon />
                    </HeroIcon>
                    {listingViews?.totalViews}
                    {!isLoading && !listingViews?.totalViews && 'No views'}
                  </FlexText>
                  <FlexText
                    title={dayjs(listing?.createdAt).format(
                      'ddd[,] MMMM Do[,] YYYY hh[:]mm A z'
                    )}
                  >
                    <HeroIcon>
                      <ClockIcon />
                    </HeroIcon>
                    {timeAgo.format(
                      dayjs(listing?.createdAt).toDate(),
                      'round'
                    )}
                  </FlexText>
                </Grid>
              </Grid.Container>
              <Divider css={{ my: '$10' }} />
              <Grid xs={6} sm={4} alignContent='center'>
                <PropertyFeatures>
                  <HeroIcon>
                    <HomeIcon />
                  </HeroIcon>
                  {`${listing?.propertyType} ${listing?.status.replace(
                    '-',
                    ' '
                  )}`}
                </PropertyFeatures>
              </Grid>
              <Grid xs={6} sm={4}>
                <PropertyFeatures>
                  <HeroIcon>
                    <MdOutlineLocationOn />
                  </HeroIcon>
                  {listing?.city}, {listing?.country.label}
                </PropertyFeatures>
              </Grid>
              <Grid xs={12} sm={0}>
                <Divider css={{ my: '$7', h: 0 }} />
              </Grid>
              <Grid xs={6} sm={4}>
                <PropertyFeatures>
                  <HeroIcon>
                    <BiExpand />
                  </HeroIcon>
                  {listing?.size} m²
                </PropertyFeatures>
              </Grid>
              <Grid xs={0} sm={12}>
                <Divider css={{ my: '$5', h: 0 }} />
              </Grid>
              <Grid xs={6} sm={4}>
                <PropertyFeatures>
                  <HeroIcon>
                    <BiBed />
                  </HeroIcon>
                  {listing?.rooms} {listing?.rooms > 1 ? 'rooms' : 'room'}
                </PropertyFeatures>
              </Grid>
              <Grid xs={12} sm={0}>
                <Divider css={{ my: '$5', h: 0 }} />
              </Grid>
              <Grid xs={12} sm={4}>
                <PropertyFeatures>
                  <HeroIcon>
                    <BiBath />
                  </HeroIcon>
                  {listing?.bathrooms}{' '}
                  {listing?.bathrooms > 1 ? 'bathrooms' : 'bathroom'}
                </PropertyFeatures>
              </Grid>
            </Grid.Container>
            <Divider css={{ my: '$10' }} />
            <Text h3 weight='semibold'>
              Description
            </Text>
            <Text size='1.1rem' css={{ mt: '$4' }}>
              {listing?.description}
            </Text>
          </Card.Body>
        </Card>
        <Divider css={{ my: '$10', h: 0 }} />
        <Grid.Container gap={2} css={{ p: 0 }}>
          <Grid xs={12} sm={6}>
            <Card variant='bordered'>
              <Card.Header>
                <Text h3 weight='semibold' id='ratings-card'>
                  Ratings
                </Text>
              </Card.Header>
              <Divider />
              <Card.Body>
                {!listingRatings?.length ? (
                  <Text
                    size={20}
                    css={{
                      d: 'flex',
                      ai: 'center',
                      jc: 'center',
                      h: '100%',
                      ta: 'center',
                    }}
                  >
                    This listing has not been rated yet.
                  </Text>
                ) : (
                  <>
                    <RatingCard listingRating={listingRatings[0]} />
                  </>
                )}
              </Card.Body>
              <Divider />
              <Card.Footer css={{ jc: 'center' }}>
                <NextLink href={`/listing/${listing?.id}/ratings`} passHref>
                  <Button as='a' auto>
                    {listingRatings?.length
                      ? 'View Ratings'
                      : 'Rate this listing'}
                  </Button>
                </NextLink>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs={12} sm={6}>
            <Card variant='bordered'>
              <Card.Header>
                <Text h3 weight='semibold'>
                  Agency Profile
                </Text>
              </Card.Header>
              <Divider />
              <Card.Body css={{ gap: '$6' }}>
                <User
                  /* title={dayjs(listing?.owner.createdAt).format(
                    'ddd[,] MMMM Do[,] YYYY hh[:]mm A z'
                  )} */
                  name={listing?.owner.name}
                  src={listing?.owner.logo}
                  size='lg'
                  css={{ pl: 0 }}
                  description={`Member since ${dayjs(
                    listing?.owner.createdAt
                  ).format('MMM DD[,] YYYY')}`}
                />
                <Text>{listing?.owner.description}</Text>
                <Grid.Container gap={2} css={{ px: 0, mt: 'auto' }}>
                  <Grid xs={6}>
                    <Button
                      css={{ w: '100%' }}
                      auto
                      href={`tel:${listing?.owner.phone}`}
                      ghost
                      as='a'
                      icon={
                        <HeroIcon>
                          <PhoneIcon />
                        </HeroIcon>
                      }
                    >
                      Call Agency
                    </Button>
                  </Grid>
                  {(discussionWithAgency.length === 0 ||
                    status === 'unauthenticated') &&
                    !isAgencyAccount &&
                    !messageSent && (
                      <Grid xs={6}>
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
                  {(discussionWithAgency.length > 0 || messageSent) && (
                    <Grid xs={6}>
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
                    <Grid xs={6}>
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
              </Card.Body>
              <Divider />
              <Card.Footer css={{ jc: 'center' }}>
                <NextLink
                  href={`/agency/${listing?.owner.id}/listings`}
                  passHref
                >
                  <Button auto as='a'>
                    View Listings
                  </Button>
                </NextLink>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
        {moreFromAgency && (
          <>
            <Divider css={{ my: '$17', h: 0 }} />
            <Grid.Container>
              <Grid xs={12}>
                <Text h3 transform='capitalize'>
                  More From {listing?.owner?.name}
                </Text>
              </Grid>
              <Grid xs={12}>
                <Divider css={{ w: '70px', my: '$3', h: '2px' }} />
              </Grid>
              <Grid xs={12}>
                <ListingsCarousel
                  listings={moreFromAgency}
                  uniqueId='morefrom'
                />
              </Grid>
            </Grid.Container>
          </>
        )}
        {recommendedListings && (
          <>
            <Divider css={{ my: '$14', h: 0 }} />
            <Grid.Container>
              <Grid xs={12}>
                <Text h3>Recommended Listings</Text>
              </Grid>
              <Grid xs={12}>
                <Divider css={{ w: '70px', my: '$3', h: '2px' }} />
              </Grid>
              <Grid xs={12}>
                <ListingsCarousel
                  listings={recommendedListings}
                  uniqueId='reclist'
                />
              </Grid>
            </Grid.Container>
          </>
        )}
      </Wrapper>
    </Layout>
  );
}

export const getServerSideProps = async ({ params, req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const listing = await prisma.listing.findUnique({
    where: {
      id: params.id,
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          logo: true,
          phone: true,
          description: true,
          createdAt: true,
          ownerId: true,
        },
      },
      views: true,
    },
  });
  if (!listing) {
    return {
      notFound: true,
    };
  }

  const moreFromAgency = await prisma.listing.findMany({
    where: {
      ownerId: listing?.owner?.id,
      isPublished: true,
      id: {
        not: listing.id,
      },
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
    },
    take: 8,
  });
  const recommendedListings = await prisma.listing.findMany({
    where: {
      OR: [
        {
          country: {
            is: {
              label: listing.country.label,
            },
          },
        },
        {
          propertyType: listing.propertyType,
        },
        {
          status: listing.status,
        },
      ],
      isPublished: true,
      id: {
        not: listing.id,
      },
      NOT: [
        {
          ownerId: session?.user?.agencyId || '',
        },
        {
          ownerId: listing?.owner?.id,
        },
      ],
    },
    orderBy: {
      views: {
        totalViews: 'desc',
      },
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
    },
    take: 6,
  });
  const discussionWithAgency = await prisma.discussion.findMany({
    where: {
      participants: {
        every: {
          id: {
            in: [listing?.owner?.ownerId, session?.user?.id ?? ''],
          },
        },
      },
    },
  });
  const listingRatings = await prisma.rating.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      listingId: params.id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    take: 2,
  });
  const { listingRatingsAvg } = await getListingRatingsAvg(params.id);

  return {
    props: {
      session,
      moreFromAgency: JSON.parse(JSON.stringify(moreFromAgency)),
      recommendedListings: JSON.parse(JSON.stringify(recommendedListings)),
      listingRatingsAvg,
      listingRatings: JSON.parse(JSON.stringify(listingRatings)),
      listing: JSON.parse(JSON.stringify(listing)),
      discussionWithAgency: JSON.parse(JSON.stringify(discussionWithAgency)),
    },
  };
};
