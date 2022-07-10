import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NextLink from 'next/link';
import { Router } from 'next/router';
import {
  DotsVerticalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { Button, Card, Popover } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

import { HeroIcon, TopButtonsContainer } from './GlobalComponents';

export default function TopButtons({
  listingId,
  listingOwnerId,
  shareDetails,
  card,
  redirectUrl = '',
}) {
  const { data: session, status } = useSession();
  const { data: userFavoriteListings, mutate } = useSWR(
    status === 'authenticated' ? '/api/user/favorites' : null,
    fetcher
  );
  const isListingOwner = listingOwnerId === session?.user?.agencyId;
  const [isListingFavorite, setIsListingFavorite] = useState(false);

  useEffect(() => {
    const isFavorite =
      userFavoriteListings?.length &&
      userFavoriteListings?.find((listing) => listing.listingId === listingId);
    setIsListingFavorite(isFavorite);
  }, [userFavoriteListings]);

  const handleFavorite = async () => {
    setIsListingFavorite((prev) => !prev);
    if (isListingFavorite) {
      let toastId;
      try {
        await fetch(`/api/listing/${listingId}/favorite`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });
        await mutate();
        toastId = toast.success('Listing removed from favorites');
      } catch (error) {
        toast.error('An error occured', {
          id: toastId,
        });
      }
    } else {
      let toastId;
      try {
        await fetch(`/api/listing/${listingId}/favorite`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        toastId = toast.success('Listing added to favorites');
      } catch (error) {
        toast.error('An error occured', {
          id: toastId,
        });
      }
    }
  };
  const handleShare = async () => {
    if (navigator.canShare(shareDetails)) {
      await navigator.share(shareDetails);
    } else {
      console.log('Share not supported');
    }
  };
  const handleDelete = async () => {
    let toastId;
    try {
      toastId = toast.loading('Deleting listing', {
        id: toastId,
      });
      await fetch(`/api/listing/${listingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      await mutate();
    } catch (error) {
      toast.error('An error occured', {
        id: toastId,
      });
    } finally {
      toast.success('Listing deleted', {
        id: toastId,
      });
      if (redirectUrl) {
        Router.replace(redirectUrl);
      }
    }
  };
  return (
    <TopButtonsContainer color={card && 'white'}>
      {!card && (
        <Button
          onPress={handleShare}
          auto
          ghost
          icon={
            <HeroIcon>
              <ShareIcon />
            </HeroIcon>
          }
          title='Share this listing'
        />
      )}
      {!isListingOwner && status === 'authenticated' && (
        <Button
          onClick={handleFavorite}
          ghost
          auto
          icon={
            <HeroIcon
              css={{ color: isListingFavorite ? '$red600' : '$gray800' }}
            >
              <HeartIcon />
            </HeroIcon>
          }
          title={
            isListingFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        />
      )}
      {isListingOwner && (
        <Popover placement='bottom-right'>
          <Popover.Trigger>
            <Button
              auto
              ghost
              icon={
                <HeroIcon>
                  <DotsVerticalIcon />
                </HeroIcon>
              }
            />
          </Popover.Trigger>
          <Popover.Content>
            <Card>
              <Card.Body css={{ p: '$6', gap: '$3' }}>
                <NextLink href={`/listing/${listingId}/edit`} passHref>
                  <Button
                    size='sm'
                    as='a'
                    auto
                    color='warning'
                    icon={
                      <HeroIcon>
                        <PencilIcon />
                      </HeroIcon>
                    }
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  size='sm'
                  auto
                  color='error'
                  icon={
                    <HeroIcon>
                      <TrashIcon />
                    </HeroIcon>
                  }
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Popover.Content>
        </Popover>
      )}
    </TopButtonsContainer>
  );
}
