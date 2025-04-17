import { useEffect } from 'react';
import { BiBath, BiBed, BiExpand } from 'react-icons/bi';
import { MdOutlineLocationOn } from 'react-icons/md';
import NextLink from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  HomeIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import {
  Button,
  Card,
  Divider,
  Grid,
  Image,
  Link,
  Text,
} from '@nextui-org/react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import 'swiper/css';
import 'swiper/css/pagination';

import 'photoswipe/style.css';

import { getListingRatingsAvg } from '@/lib/db';
import prisma from '@/lib/prisma';

import Layout from '@/components/Layout';
import AboutAgency from '@/components/pages/listing/about-agency';
import SuggestedListings from '@/components/pages/listing/suggested-listings';
import {
  ArrowIcon,
  FlexDiv,
  FlexText,
  HeroIcon,
  ImageGalleryContainer,
  PropertyFeatures,
  RatingCard,
  TextTruncate,
  TopButtons,
  Wrapper,
} from '@/components/shared';

import dayjs from '@/utils/dayjs';
import { fetcher } from '@/utils/fetcher';
import timeAgo from '@/utils/timeAgo';

export default function ListingPage({
  listing,
  listingRatingsAvg,
  listingRatings,
}) {
  const { data: listingViews, isLoading } = useSWR(
    `/api/listing/${listing.id}/view`,
    fetcher,
    {
      fallbackData: listing?.views?.totalViews,
    }
  );

  const listingUrl = typeof document !== 'undefined' && document.location.href;
  const shareDetails = { url: listingUrl, title: listing?.title };
  const scrollToRatings = () => {
    const ratingsCard = document.getElementById('ratings-card');
    ratingsCard.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const getImageDimensions = async (imageUrl) => {
      return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
        img.src = imageUrl;
      });
    };

    const updateImageDimensions = async () => {
      const images = document.querySelectorAll('#test-gallery a');
      for (const image of images) {
        const dimensions = await getImageDimensions(image.href);
        image.setAttribute('data-pswp-width', dimensions.width);
        image.setAttribute('data-pswp-height', dimensions.height);
      }
    };

    updateImageDimensions();

    let lightbox = new PhotoSwipeLightbox({
      gallery: '#test-gallery',
      children: 'a',
      showHideAnimationType: 'zoom',
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
        <Grid.Container css={{ columnGap: '$10', rowGap: '$13' }}>
          <Grid xs={12} sm={8}>
            <Card
              css={{ p: '$sm', '@xsMax': { p: 0, border: 0 } }}
              variant='bordered'
            >
              <Card.Body css={{ p: 0 }}>
                <Grid.Container css={{ position: 'relative' }}>
                  {/* don't show navigation buttons if images count is lower than images per view */}
                  {listing?.images?.length > 2 && (
                    <>
                      <ArrowIcon
                        as='div'
                        arrow='left'
                        className='image-swiper-button-prev'
                      >
                        <FlexText span>
                          <HeroIcon>
                            <ChevronLeftIcon />
                          </HeroIcon>
                        </FlexText>
                      </ArrowIcon>
                      <ArrowIcon
                        as='div'
                        arrow='right'
                        className='image-swiper-button-next'
                      >
                        <FlexText span>
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
                              target='_blank'
                              rel='noreferrer'
                              data-cropped='true'
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
          </Grid>
          <Grid xs={12} sm>
            <Grid.Container
              css={{ p: 0, gap: '$10' }}
              direction='column'
              wrap='nowrap'
            >
              <AboutAgency listing={listing} />
              <Grid xs={12} sm={12}>
                <Card variant='bordered'>
                  <Card.Header>
                    <Text h3 weight='semibold' id='ratings-card' css={{ m: 0 }}>
                      <NextLink
                        href={`/listing/${listing?.id}/ratings`}
                        passHref
                      >
                        <Link underline color='text'>
                          Ratings
                          <HeroIcon css={{ ml: '$2' }}>
                            <ChevronRightIcon />
                          </HeroIcon>
                        </Link>
                      </NextLink>
                    </Text>
                  </Card.Header>
                  <Divider />
                  <Card.Body>
                    {!listingRatings?.length ? (
                      <FlexDiv
                        css={{
                          ai: 'center',
                          jc: 'center',
                          h: '100%',
                          ta: 'center',
                          flexDirection: 'column',
                          gap: '$10',
                        }}
                      >
                        <Text size={20}>
                          This listing has not been rated yet.
                        </Text>
                        <NextLink
                          href={`/listing/${listing?.id}/ratings`}
                          passHref
                        >
                          <Button as='a' auto>
                            Rate it!
                          </Button>
                        </NextLink>
                      </FlexDiv>
                    ) : (
                      <FlexDiv css={{ gap: '$8', flexDirection: 'column' }}>
                        {listingRatings.slice(0, 3).map((listingRating) => (
                          <RatingCard
                            key={listingRating.id}
                            listingRating={listingRating}
                          />
                        ))}
                      </FlexDiv>
                    )}
                  </Card.Body>
                </Card>
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
        <SuggestedListings listing={listing} />
      </Wrapper>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const listings = await prisma.listing.findMany({
    select: {
      id: true,
    },
    take: 50,
  });

  return {
    paths: listings.map((listing) => ({
      params: {
        id: listing.id,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
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
      listingRatingsAvg,
      listingRatings: JSON.parse(JSON.stringify(listingRatings)),
      listing: JSON.parse(JSON.stringify(listing)),
    },
    revalidate: 10,
  };
};
