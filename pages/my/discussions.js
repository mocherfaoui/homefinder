import { useEffect, useState } from 'react';
import useSWR from 'swr';

import useMediaQuery from '@/hooks/useMediaQuery';

import DiscussionsPageL from '@/components/DiscussionsPage/DiscussionPageL';
import DiscussionsPageS from '@/components/DiscussionsPage/DiscussionPageS';

import dayjs from '@/utils/dayjs';
import { fetcher } from '@/utils/fetcher';

export default function DiscussionsPage() {
  const { data: discussions, isLoading: isLoadingDiscussions } = useSWR(
    '/api/discussions',
    fetcher,
    {
      refreshInterval: 2000,
    }
  );
  const isLargerScreen = useMediaQuery('(min-width: 1280px)');
  const isSmallerScreen = useMediaQuery('(max-width: 1270px)');
  const [activeDiscussion, setActiveDiscussion] = useState('');
  const [receiver, setReceiver] = useState({
    name: '',
    image: '',
  });
  const [isSSR, setIsSSR] = useState(true);
  const { data: messages } = useSWR(
    activeDiscussion ? `/api/message/${activeDiscussion}` : null,
    fetcher
  );
  discussions?.sort(
    (a, b) =>
      dayjs(b.messages[0].createdAt).toDate() -
      dayjs(a.messages[0].createdAt).toDate()
  );
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <>
      {!isSSR && isLargerScreen && (
        <DiscussionsPageL
          messages={messages}
          discussions={discussions}
          receiver={receiver}
          setReceiver={setReceiver}
          activeDiscussion={activeDiscussion}
          setActiveDiscussion={setActiveDiscussion}
          isLoadingDiscussions={isLoadingDiscussions}
        />
      )}
      {!isSSR && isSmallerScreen && (
        <DiscussionsPageS
          messages={messages}
          discussions={discussions}
          receiver={receiver}
          setReceiver={setReceiver}
          activeDiscussion={activeDiscussion}
          setActiveDiscussion={setActiveDiscussion}
          isLoadingDiscussions={isLoadingDiscussions}
        />
      )}
    </>
  );
}
