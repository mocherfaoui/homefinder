import { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { ArrowSmLeftIcon, ChevronDownIcon } from '@heroicons/react/outline';
import {
  Avatar,
  Button,
  Grid,
  Loading,
  Text,
  Textarea,
} from '@nextui-org/react';
import useSWRMutation from 'swr/mutation';

import useMediaQuery from '@/hooks/useMediaQuery';

import { Div, HeroIcon, ScrollToBottomButton } from '../GlobalComponents';
import Message from '../Message';

async function sendMessage(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function ChatArea({
  messages,
  session,
  activeDiscussion,
  setActiveDiscussion,
  receiver,
}) {
  const [message, setMessage] = useState('');
  const [isOnBottom, setIsOnBottom] = useState(true);
  const isSmallerScreen = useMediaQuery('(max-width: 1270px)');
  const scrollRef = useRef();
  const bottom = useRef();
  const { trigger, isMutating } = useSWRMutation(
    `/api/message/${activeDiscussion}`,
    sendMessage
  );
  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    try {
      trigger({ message });
    } catch (error) {
      console.log(error);
    } finally {
      setMessage('');
    }
  };
  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleMessageSend(e);
    }
  };

  const onScroll = ({ target }) => {
    //show the scroll to bottom button only if the user scrolled 150px up
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 150) {
      setIsOnBottom(true);
    } else {
      setIsOnBottom(false);
    }
    //if (target.scrollTop === 0) target.scrollTop = 10;
  };
  const scrollToBottom = () => {
    bottom.current.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <Div
        css={{
          order: 1,
          '@md': { pl: '$9' },
          py: '$5',
          borderBottom: '1px solid $border',
        }}
      >
        <Div css={{ d: 'flex', ai: 'center' }}>
          {isSmallerScreen && (
            <HeroIcon
              css={{ mr: '$8', cursor: 'pointer' }}
              onClick={() => setActiveDiscussion('')}
            >
              <ArrowSmLeftIcon />
            </HeroIcon>
          )}
          <Avatar
            src={receiver?.image}
            size='md'
            text={receiver?.name.split(' ')[0][0]}
          />
          <Text css={{ pl: '$4' }} weight='semibold'>
            {receiver?.name}
          </Text>
        </Div>
      </Div>
      <Div css={{ position: 'relative', flex: '1 1 0', order: 2 }}>
        <ScrollToBottomButton onClick={scrollToBottom} visible={!isOnBottom}>
          <HeroIcon>
            <ChevronDownIcon />
          </HeroIcon>
        </ScrollToBottomButton>
        <Div
          ref={scrollRef}
          onScroll={onScroll}
          css={{
            d: 'flex',
            position: 'absolute',
            top: 0,
            h: '100%',
            w: '100%',
            '@md': { pl: '$9' },
            flexDirection: 'column',
            overflow: 'hidden auto',
            scrollbarColor: ' $colors$gray600 $colors$gray300',
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
            '&::-webkit-scrollbar': {
              width: '0.4rem',
            },
            '&::-webkit-scrollbar-thumb': {
              bg: '$gray500',
              br: '$md',
            },
          }}
        >
          <Div css={{ flex: '1 1 auto', minHeight: '12px' }}></Div>
          <Grid.Container
            xs={12}
            css={{
              d: 'flex!important',
              '@mdMax': { px: '$5' },
              '@md': { pr: '$18', pl: '$5' },
              h: 'fit-content',
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: 'auto!important',
            }}
          >
            {messages?.map((message, index) => (
              <Message
                key={message.id}
                index={index}
                message={message}
                messages={messages}
                loggedInUserId={session?.user?.id}
              />
            ))}
          </Grid.Container>
          <div ref={bottom}></div>
        </Div>
      </Div>
      <Div
        css={{
          w: '100%',
          order: 3,
          '@md': { pl: '$9', mb: '$8' },
          '@mdMax': {
            pb: '$2',
          },
        }}
      >
        <Grid.Container
          as='form'
          xs={12}
          css={{
            d: 'flex!important',
            gap: '$6',
            h: 'fit-content',
            pt: '$sm',
          }}
          alignItems='flex-end'
          wrap='nowrap'
          onSubmit={handleMessageSend}
        >
          <Grid xs={10} md={11}>
            <Textarea
              aria-label='type a message'
              minRows={1}
              maxRows={3}
              fullWidth
              placeholder='type a message'
              bordered
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onEnterPress}
            />
          </Grid>
          <Grid xs={2} md justify='center'>
            <Button
              icon={
                !isMutating && (
                  <HeroIcon>
                    <BiSend />
                  </HeroIcon>
                )
              }
              disabled={!message || isMutating}
              auto
              css={{ w: '100%' }}
              type='submit'
            >
              {isMutating ? (
                <Loading type='points' color='currentColor' />
              ) : null}
            </Button>
          </Grid>
        </Grid.Container>
      </Div>
    </>
  );
}
