import { BiBath, BiBed } from 'react-icons/bi';
import { MdOutlineLocationOn } from 'react-icons/md';
import NextLink from 'next/link';
import { Card, Text } from '@nextui-org/react';

import {
  Div,
  FlexDiv,
  FlexText,
  HeroIcon,
  TextTruncate,
} from './shared-components';
import { TopButtons } from './top-buttons';

export function ListingCard({ listing }) {
  return (
    <Card variant='bordered' borderWeight='normal' isHoverable>
      <Card.Header
        css={{
          d: 'inline-flex',
          position: 'absolute',
          zIndex: 10,
          top: 0,
          right: 0,
          w: 'fit-content',
        }}
      >
        <TopButtons
          listingId={listing?.id}
          listingOwnerId={listing?.ownerId}
          card
        />
      </Card.Header>
      <Card.Body
        css={{
          p: 0,
          '& .nextui-image-container': { m: 0 },
          '& > div': {
            bblr: 0,
            bbrr: 0,
          },
        }}
      >
        <NextLink href={`/listing/${listing?.id}`} passHref>
          <Div
            as='a'
            css={{
              position: 'absolute',
              h: '200px',
              w: '100%',
              top: 0,
              zIndex: 1,
            }}
          ></Div>
        </NextLink>
        <Card.Image
          showSkeleton
          css={{ h: '200px!important', w: 'auto' }}
          src={listing?.images[0]}
          objectFit='cover'
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          p: '$sm',
          fd: 'column',
          ai: 'baseline',
          color: '$text',
          minHeight: 'fit-content',
          bg: '#ffffff',
          borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <NextLink href={`/listing/${listing?.id}`} passHref>
          <FlexText as='a' css={{ fd: 'column', ai: 'baseline', w: '100%' }}>
            <FlexText as='div' css={{ gap: '$2' }}>
              <Text weight='semibold' size='1.2rem'>
                ${Number(listing?.price).toLocaleString()}
              </Text>
              {listing?.status === 'for-rent' && (
                <Text span size={12} color='$gray700'>
                  /month
                </Text>
              )}
            </FlexText>
            <FlexText
              as='div'
              css={{
                jc: 'space-between',
                w: '100%',
                ac: 'center',
                flexWrap: 'wrap',
                gap: '$5',
              }}
            >
              <FlexDiv
                as='div'
                css={{
                  fs: '.9rem',
                  color: '$text',
                  fontWeight: '$normal',
                  gap: '$1',
                }}
              >
                <HeroIcon>
                  <MdOutlineLocationOn />
                </HeroIcon>
                <TextTruncate
                  css={{
                    fs: 'inherit',
                    color: 'inherit',
                    fontWeight: 'inherit',
                  }}
                >
                  {listing?.city}, {listing?.country?.label}
                </TextTruncate>
              </FlexDiv>
              <FlexText
                as='div'
                css={{
                  fs: '0.75rem',
                  color: '$gray700',
                }}
              >
                <FlexText css={{ gap: '$2', fs: 'inherit', color: 'inherit' }}>
                  <HeroIcon>
                    <BiBed />
                  </HeroIcon>
                  {listing?.rooms}
                </FlexText>
                <FlexText span color='inherit' size='.3rem'>
                  &bull;
                </FlexText>
                <FlexText css={{ gap: '$2', fs: 'inherit', color: 'inherit' }}>
                  <HeroIcon>
                    <BiBath />
                  </HeroIcon>
                  {listing?.bathrooms}
                </FlexText>
              </FlexText>
            </FlexText>
          </FlexText>
        </NextLink>
      </Card.Footer>
    </Card>
  );
}
