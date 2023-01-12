import { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { MdOutlineAttachMoney, MdOutlineLocationOn } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { HomeIcon } from '@heroicons/react/outline';
import { Button, Card, Grid, Input, Popover, Text } from '@nextui-org/react';
import useSWRInfinite from 'swr/infinite';
import 'swiper/css';

import 'react-loading-skeleton/dist/skeleton.css';

import { propertyTypes } from '@/lib/constants';

import {
  FilterContainer,
  FlexDiv,
  HeroIcon,
  ListingCard,
  ReactSelect,
} from '@/components/shared';

import { fetcher } from '@/utils/fetcher';

export function SearchAndFilters({ agencyId, status }) {
  const router = useRouter();
  const [resetFilters, setResetFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    city: '',
    country: '',
    minPrice: 100,
    maxPrice: 99999999,
    propertyType: { value: 'all', label: 'All Property Types' },
    status: status ?? 'all',
    agencyId: agencyId ?? '',
  });

  const types = propertyTypes.map((type) => ({
    value: type,
    label: type,
  }));
  types.unshift({
    value: 'all',
    label: 'All Property Types',
  });

  const searchQueries = `/api/search?city=${searchQuery.city}&country=${searchQuery.country}&minPrice=${searchQuery.minPrice}&maxPrice=${searchQuery.maxPrice}&propertyType=${searchQuery.propertyType.value}&status=${searchQuery.status}&agencyId=${searchQuery.agencyId}`;

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
      <Grid xs={12} css={{ position: 'relative', h: '$17' }}>
        <Grid.Container
          css={{
            px: 0,
            position: 'absolute',
            gap: '$2',
          }}
        >
          <Grid xs={0} sm={0.8}>
            <Text span weight='medium' size='1.1rem' css={{ my: 'auto' }}>
              Filters:
            </Text>
          </Grid>
          <Grid.Container
            xs={12}
            sm={11}
            css={{
              gap: '$8',
              w: '100%',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            wrap='nowrap'
          >
            <FilterContainer xs={6}>
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
                    <Card.Body css={{ p: '$sm', gap: '$4', maxW: '220px' }}>
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
            <FilterContainer xs={6} css={{ minWidth: 'fit-content' }}>
              <HeroIcon>
                <HomeIcon />
              </HeroIcon>
              <ReactSelect
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    propertyType: e,
                  })
                }
                value={searchQuery.propertyType}
                options={types}
                placeholder='Select Property Type'
              />
            </FilterContainer>
            <FilterContainer xs={6}>
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
                    <Card.Body css={{ p: '$sm', gap: '$4', maxW: '220px' }}>
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
            <FilterContainer xs={6}>
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
          </Grid.Container>
        </Grid.Container>
      </Grid>
      <Grid xs={12} css={{ py: '$9' }}>
        <Grid.Container gap={2} css={{ px: 0 }}>
          {searchResult?.map((results) =>
            results.map((listing) => (
              <Grid xs={12} sm={3} key={listing.id}>
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
              <Grid key={i} xs={12} sm={3} css={{ d: 'block!important' }}>
                <Skeleton height={290} borderRadius={14} />
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
