import Skeleton from 'react-loading-skeleton';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Grid } from '@nextui-org/react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'react-loading-skeleton/dist/skeleton.css';

import { ListingCard } from './listing-card';
import {
  ArrowIcon,
  FlexText,
  HeroIcon,
  SliderContainer,
} from './shared-components';

export function ListingsCarousel({ listings, uniqueId = 'sw' }) {
  return (
    <Grid.Container css={{ position: 'relative' }}>
      <ArrowIcon as='div' arrow='left'>
        <FlexText span className={`${uniqueId}-swiper-button-prev`}>
          <HeroIcon>
            <ChevronLeftIcon />
          </HeroIcon>
        </FlexText>
      </ArrowIcon>
      <ArrowIcon as='div' arrow='right'>
        <FlexText span className={`${uniqueId}-swiper-button-next`}>
          <HeroIcon>
            <ChevronRightIcon />
          </HeroIcon>
        </FlexText>
      </ArrowIcon>
      <Grid xs={12}>
        <SliderContainer>
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 'auto',
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: `.${uniqueId}-swiper-button-next`,
              prevEl: `.${uniqueId}-swiper-button-prev`,
              disabledClass: 'swiper-button-disabled',
              lockClass: 'swiper-button-lock',
            }}
            className='mySwiper'
          >
            {listings?.map((listing) => (
              <SwiperSlide key={listing.id}>
                <ListingCard listing={listing} />
              </SwiperSlide>
            ))}
            {!listings?.length &&
              [...Array(4)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Skeleton height={290} borderRadius={14} />
                </SwiperSlide>
              ))}
          </Swiper>
        </SliderContainer>
      </Grid>
    </Grid.Container>
  );
}
