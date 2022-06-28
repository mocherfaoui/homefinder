import { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { MdOutlineAttachMoney, MdOutlineLocationOn } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/outline';
import { Button, Card, Grid, Input, Popover, Text } from '@nextui-org/react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWRInfinite from 'swr/infinite';
import 'swiper/css';

import 'react-loading-skeleton/dist/skeleton.css';

import { propertyTypes } from '@/lib/constants';

import {
  ArrowIcon,
  FilterContainer,
  FilterSliderContainer,
  FlexDiv,
  FlexText,
  HeroIcon,
  NormalSelect,
} from '@/components/GlobalComponents';
import ListingCard from '@/components/ListingCard';

import { fetcher } from '@/utils/fetcher';

export default function SearchAndFilters({ agencyId, status }) {
  const router = useRouter();
  const [resetFilters, setResetFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    city: '',
    country: '',
    minPrice: 100,
    maxPrice: 99999999,
    propertyType: 'all',
    status: status ?? 'all',
    agencyId: agencyId ?? '',
  });

  const searchQueries = `/api/search?city=${searchQuery.city}&country=${searchQuery.country}&minPrice=${searchQuery.minPrice}&maxPrice=${searchQuery.maxPrice}&propertyType=${searchQuery.propertyType}&status=${searchQuery.status}&agencyId=${searchQuery.agencyId}`;

  const getKey = (pageIndex, previousPageData) => {
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return searchQueries + '&cursor=null';

    // add the cursor to the API endpoint
    return searchQueries + `&cursor=${previousPageData.at(-1).id}`;
  };
  const {
    data: searchResult,
    size,
    setSize,
    isValidating,
    error,
  } = useSWRInfinite(getKey, fetcher, { keepPreviousData: true });

  const PAGE_SIZE = 12;
  const isLoadingInitialData = !searchResult && !error;
  const isEmpty = searchResult && searchResult[0]?.length === 0;
  const isReachingEnd =
    searchResult && searchResult[searchResult.length - 1]?.length < PAGE_SIZE;

  useEffect(() => {
    if (!router.isReady) return;

    const {
      city,
      country,
      minPrice,
      maxPrice,
      propertyType,
      status,
      resetFilters,
    } = router.query;
    const urlHasFilters = Object.keys(router.query).length > 1;
    if (urlHasFilters) {
      setSearchQuery({
        city,
        country,
        minPrice,
        maxPrice,
        propertyType,
        status,
        agencyId: '',
      });
    }
  }, [router.isReady]);
  return (
    <Grid.Container>
      <Grid xs={12}>
        <Grid.Container gap={1.5} css={{ px: 0 }}>
          <Grid xs={0} sm={0.8}>
            <Text span weight='medium' size='1.1rem' css={{ my: 'auto' }}>
              Filters:
            </Text>
          </Grid>
          <Grid xs={1} sm={0} css={{ pl: 0 }}>
            <ArrowIcon color='text'>
              <FlexText span className='swiper-button-prev'>
                <HeroIcon>
                  <ChevronLeftIcon />
                </HeroIcon>
              </FlexText>
            </ArrowIcon>
          </Grid>
          <Grid
            xs={10}
            sm={11}
            css={{
              '& .swiper > .swiper-wrapper': {
                ai: 'center',
              },
            }}
          >
            <FilterSliderContainer>
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                  disabledClass: 'swiper-button-disabled',
                  lockClass: 'swiper-button-lock',
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
                slidesPerView={1}
                spaceBetween={10}
                preventInteractionOnTransition
              >
                <SwiperSlide>
                  <FilterContainer>
                    <HeroIcon>
                      <MdOutlineLocationOn />
                    </HeroIcon>
                    <Popover>
                      <Popover.Trigger>
                        <Button auto flat color='text' css={{ w: '100%' }}>
                          {searchQuery.city || 'City'},{' '}
                          {searchQuery.country || 'Country'}
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content>
                        <Card>
                          <Card.Body
                            css={{ p: '$sm', gap: '$4', maxW: '220px' }}
                          >
                            <Input
                              value={searchQuery.city}
                              aria-label='City'
                              placeholder='city'
                              size='sm'
                              labelLeft='city'
                              onChange={(e) =>
                                setSearchQuery({
                                  ...searchQuery,
                                  city: e.target.value,
                                })
                              }
                            />
                            <Input
                              value={searchQuery.country}
                              aria-label='Country'
                              placeholder='country'
                              size='sm'
                              labelLeft='country'
                              onChange={(e) =>
                                setSearchQuery({
                                  ...searchQuery,
                                  country: e.target.value,
                                })
                              }
                            />
                            <Button auto size='xs'>
                              Save
                            </Button>
                          </Card.Body>
                        </Card>
                      </Popover.Content>
                    </Popover>
                  </FilterContainer>
                </SwiperSlide>
                <SwiperSlide>
                  <FilterContainer>
                    <HeroIcon>
                      <HomeIcon />
                    </HeroIcon>
                    <NormalSelect
                      css={{ w: '100%', fontWeight: '$medium' }}
                      onChange={(e) =>
                        setSearchQuery({
                          ...searchQuery,
                          propertyType: e.target.value,
                        })
                      }
                      value={searchQuery.propertyType}
                    >
                      <option value=''>Select Property Type</option>
                      <option value='all'>All</option>
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </NormalSelect>
                  </FilterContainer>
                </SwiperSlide>
                <SwiperSlide>
                  <FilterContainer>
                    <HeroIcon>
                      <MdOutlineAttachMoney />
                    </HeroIcon>
                    <Popover>
                      <Popover.Trigger>
                        <Button auto flat color='text' css={{ w: '100%' }}>
                          {searchQuery.minPrice > 0 && '$'}
                          {searchQuery.minPrice || 'min'} -{' '}
                          {searchQuery.maxPrice > 0 && '$'}
                          {searchQuery.maxPrice || 'max'}
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content>
                        <Card>
                          <Card.Body
                            css={{ p: '$sm', gap: '$4', maxW: '220px' }}
                          >
                            <Input
                              value={searchQuery.minPrice}
                              aria-label='minimum price'
                              placeholder='minimum price'
                              size='sm'
                              labelLeft='min'
                              type='number'
                              min='100'
                              max={searchQuery.maxPrice}
                              onChange={(e) =>
                                setSearchQuery({
                                  ...searchQuery,
                                  minPrice: e.target.value,
                                })
                              }
                            />
                            <Input
                              value={searchQuery.maxPrice}
                              aria-label='maximum price'
                              placeholder='maximum price'
                              size='sm'
                              labelLeft='max'
                              type='number'
                              min={searchQuery.minPrice}
                              max='1000000'
                              onChange={(e) =>
                                setSearchQuery({
                                  ...searchQuery,
                                  maxPrice: e.target.value,
                                })
                              }
                            />
                            <Button auto size='xs'>
                              Save
                            </Button>
                          </Card.Body>
                        </Card>
                      </Popover.Content>
                    </Popover>
                  </FilterContainer>
                </SwiperSlide>
                <SwiperSlide>
                  <FilterContainer>
                    <HeroIcon>
                      <BsQuestion />
                    </HeroIcon>
                    <FlexDiv css={{ d: 'flex', ai: 'center', gap: '$4' }}>
                      <Button.Group>
                        <Button
                          flat={searchQuery.status !== 'all'}
                          size='sm'
                          auto
                          onClick={() =>
                            setSearchQuery({
                              ...searchQuery,
                              status: 'all',
                            })
                          }
                        >
                          All
                        </Button>
                        <Button
                          flat={searchQuery.status !== 'for-sale'}
                          size='sm'
                          auto
                          onClick={() =>
                            setSearchQuery({
                              ...searchQuery,
                              status: 'for-sale',
                            })
                          }
                        >
                          For sale
                        </Button>
                        <Button
                          flat={searchQuery.status !== 'for-rent'}
                          size='sm'
                          auto
                          onClick={() =>
                            setSearchQuery({
                              ...searchQuery,
                              status: 'for-rent',
                            })
                          }
                        >
                          For rent
                        </Button>
                      </Button.Group>
                    </FlexDiv>
                  </FilterContainer>
                </SwiperSlide>
              </Swiper>
            </FilterSliderContainer>
          </Grid>
          <Grid xs={1} sm={0} css={{ pr: 0 }}>
            <ArrowIcon color='text'>
              <FlexText span className='swiper-button-next'>
                <HeroIcon>
                  <ChevronRightIcon />
                </HeroIcon>
              </FlexText>
            </ArrowIcon>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={12} css={{ py: '$9' }}>
        <Grid.Container gap={2} css={{ px: 0 }}>
          {searchResult?.map((results) =>
            results.map((listing) => (
              <Grid xs={6} sm={3} key={listing.id}>
                <ListingCard listing={listing} />
              </Grid>
            ))
          )}
          {isEmpty && !isValidating && (
            <Grid xs={12} justify='center'>
              <Text size='1.4rem' weight='semibold'>
                No results found, try to use more filters.
              </Text>
            </Grid>
          )}
          {isLoadingInitialData &&
            [...Array(12)].map((_, i) => (
              <Grid key={i} xs={6} sm={3} css={{ d: 'block!important' }}>
                <Skeleton height={300} borderRadius={14} />
              </Grid>
            ))}
        </Grid.Container>
      </Grid>
      <Grid xs={12} justify='center'>
        <Button
          disabled={isReachingEnd}
          light={isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isReachingEnd ? "You've reached the end" : 'Load more'}
        </Button>
      </Grid>
    </Grid.Container>
  );
}
