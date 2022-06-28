import { Rating } from 'react-simple-star-rating';
import { Avatar, Card, Text } from '@nextui-org/react';

import dayjs from '@/utils/dayjs';
import timeAgo from '@/utils/timeago';

import { FlexDiv } from '../GlobalComponents';

export default function RatingCard({ listingRating }) {
  return (
    <FlexDiv css={{ w: '100%', gap: '$3' }}>
      <Avatar
        css={{ mt: '$8' }}
        src={listingRating.user.image}
        text={listingRating?.user?.name?.split(' ')[0][0]}
      />
      <FlexDiv css={{ w: '100%' }}>
        <Card variant='bordered' borderWeight='light'>
          <Card.Header>
            <FlexDiv css={{ flexDirection: 'column' }}>
              <FlexDiv css={{ ai: 'center', gap: '$3' }}>
                <Text
                  weight='semibold'
                  css={{
                    '@xsMax': {
                      fs: '.9rem',
                    },
                  }}
                >
                  {listingRating.user.name}
                </Text>
                <Text
                  size='.6rem'
                  color='$gray700'
                  css={{
                    '@xsMax': {
                      fs: '.4rem',
                    },
                  }}
                >
                  &bull;
                </Text>
                <Text
                  color='$gray700'
                  size='.9rem'
                  css={{
                    '@xsMax': {
                      fs: '.8rem',
                    },
                  }}
                >
                  {timeAgo.format(
                    dayjs(listingRating?.createdAt).toDate(),
                    'twitter-minute-now'
                  )}
                </Text>
              </FlexDiv>
              <Rating readonly size={20} initialValue={listingRating.rating} />
            </FlexDiv>
          </Card.Header>
          <Card.Body css={{ p: '$sm', pt: 0 }}>
            <Text size='1.1rem' css={{ wordBreak: 'break-word' }}>
              {listingRating.comment}
            </Text>
          </Card.Body>
        </Card>
      </FlexDiv>
    </FlexDiv>
  );
}
