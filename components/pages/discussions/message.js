import { Grid, Text } from '@nextui-org/react';

import { Div, MessageContainer, MessageDate } from '@/components/shared';

import dayjs from '@/utils/dayjs';
import { formatDate } from '@/utils/formatDate';

export function Message({ message, messages, index, loggedInUserId }) {
  const isYou = message?.authorId === loggedInUserId;
  //check if the previous message is from the same author
  const isSameAuthor = messages[index - 1]?.authorId === message?.authorId;
  //check if the previous message is from the same day, false for the first message so it can show the date before it
  const isSameDay =
    index === 0
      ? false
      : dayjs(message?.createdAt).isSame(
          dayjs(messages[index - 1]?.createdAt),
          'day'
        );
  return (
    <>
      {!isSameDay && (
        <Grid xs={12} css={{ mb: '$5' }} justify='center'>
          <MessageDate span transform='uppercase'>
            {formatDate(message?.createdAt)}
          </MessageDate>
        </Grid>
      )}
      <Grid
        xs={12}
        css={{
          jc: isYou ? 'flex-end' : 'flex-start',
          mb: '$5',
          mt: isSameAuthor && isSameDay ? '-$4' : 0,
        }}
      >
        <MessageContainer
          message={isYou ? 'out' : 'in'}
          isSameAuthor={isSameAuthor}
        >
          <Div
            css={{
              position: 'relative',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
            }}
          >
            <Text span>
              <Text
                size={15}
                span
                css={{
                  wordBreak: 'break-word',
                  lineHeight: '19px',
                }}
              >
                {message?.content}
              </Text>
            </Text>
            <Text
              span
              css={{
                w: '51px',
                d: 'inline-block',
                verticalAlign: 'middle',
              }}
            ></Text>
          </Div>
          <Div
            css={{
              position: 'relative',
              float: 'right',
              m: '-10px 0 -5px 4px;',
            }}
          >
            <Div
              css={{
                fs: '.7rem',
                h: '15px',
                lineHeight: '15px',
                whiteSpace: 'nowrap',
              }}
            >
              <Text
                span
                css={{
                  d: 'inline-block',
                  verticalAlign: 'top',
                  color: '$gray700',
                }}
              >
                {dayjs(message?.createdAt).format('HH:mm')}
              </Text>
            </Div>
          </Div>
        </MessageContainer>
      </Grid>
    </>
  );
}
