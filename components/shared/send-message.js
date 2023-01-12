import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSend } from 'react-icons/bi';
import { Button, Loading, Modal, Text, Textarea } from '@nextui-org/react';

import { FlexText, HeroIcon } from './shared-components';

export function SendMessageModal({
  visible,
  onClose,
  agencyOwnerId,
  session,
  listing,
  setMessageSent,
}) {
  const [message, setMessage] = useState(
    `Hi, I'm interested in your ${listing.title} (#${listing.id})`
  );
  const [sending, setSending] = useState(false);
  const handleDiscussionCreate = async () => {
    try {
      setSending(true);
      await fetch(`/api/discussion/${agencyOwnerId}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
      setMessageSent(true);
      onClose();
      toast.success('Message sent!');
    }
  };
  return (
    <Modal
      closeButton
      aria-labelledby='send-message-modal'
      open={visible}
      blur
      onClose={onClose}
    >
      <Modal.Header>
        <FlexText h3>Send a quick message</FlexText>
      </Modal.Header>

      <Modal.Body>
        {session && (
          <>
            <Textarea
              aria-label='Message'
              placeholder='type a message'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button
              icon={
                !sending && (
                  <HeroIcon>
                    <BiSend />
                  </HeroIcon>
                )
              }
              disabled={!message || sending}
              auto
              onClick={handleDiscussionCreate}
            >
              {sending ? (
                <Loading type='points' color='currentColor' />
              ) : (
                'Send'
              )}
            </Button>
          </>
        )}

        {!session && (
          <Text weight='medium' css={{ ta: 'center' }}>
            You must be logged in to send a message
          </Text>
        )}
      </Modal.Body>
    </Modal>
  );
}
