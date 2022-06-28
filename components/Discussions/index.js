import { BsCheck2 } from 'react-icons/bs';
import { Avatar, Card, Grid, Text } from '@nextui-org/react';

import { formatDate } from '@/utils/formatDate';

import { FlexDiv, HeroIcon, TextTruncate } from '../GlobalComponents';

export default function DiscussionsSidebar({
  discussion,
  activeDiscussion,
  setActiveDiscussion,
  setReceiver,
  session,
}) {
  const isYou = discussion?.messages[0].authorId === session?.user?.id;
  const isActiveDiscussion = activeDiscussion === discussion.id;
  const selectDiscussion = () => {
    setActiveDiscussion(discussion.id);
    setReceiver({
      name:
        discussion?.participants[0]?.agencies[0]?.name ??
        discussion?.participants[0]?.name,
      image:
        discussion?.participants[0]?.agencies[0]?.logo ??
        discussion.participants[0]?.image,
    });
  };
  return (
    <Grid xs={12} alignItems='center'>
      <Card
        variant='flat'
        css={{
          br: 0,
          bg: isActiveDiscussion ? '$gray200' : 'transparent',
          '@md': {
            '&:hover': {
              bg: isActiveDiscussion ? '$gray200' : '$gray50',
            },
          },
        }}
        isPressable
        onClick={selectDiscussion}
      >
        <Card.Body
          css={{
            fd: 'row',
            p: '$sm',
            gap: '$5',
            '@xsMax': {
              px: 0,
            },
          }}
        >
          <FlexDiv>
            <Avatar
              size='lg'
              src={
                discussion?.participants[0]?.agencies[0]?.logo ??
                discussion.participants[0]?.image
              }
              text={discussion?.participants[0]?.name.split(' ')[0][0]}
              css={{ my: 'auto' }}
            />
          </FlexDiv>
          <FlexDiv css={{ fd: 'column', w: '100%' }}>
            <FlexDiv css={{ ai: 'center', jc: 'space-between' }}>
              <Text weight='semibold'>
                {discussion?.participants[0]?.agencies[0]?.name ??
                  discussion?.participants[0]?.name}
              </Text>
              <Text span size='13px' color='$gray800'>
                {formatDate(discussion?.messages[0]?.createdAt)}
              </Text>
            </FlexDiv>
            <FlexDiv
              css={{
                color: isActiveDiscussion ? '$text' : '$gray700',
                gap: '$1',
              }}
            >
              {isYou && (
                <HeroIcon css={{ color: '$gray800' }}>
                  <BsCheck2 />
                </HeroIcon>
              )}
              <TextTruncate
                css={{ color: isActiveDiscussion ? '$text' : '$gray800' }}
                title={discussion?.messages[0]?.content}
              >
                {discussion?.messages[0]?.content}
              </TextTruncate>
            </FlexDiv>
          </FlexDiv>
        </Card.Body>
      </Card>
    </Grid>
  );
}
