import { Divider, Grid, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import { ChatArea } from './chat-area';
import { DiscussionsSidebar } from './discussions-sidebar';
import { DiscussionsPageLayout } from './layout';

export function DiscussionsPageS({
  messages,
  discussions,
  receiver,
  setReceiver,
  activeDiscussion,
  setActiveDiscussion,
  isLoadingDiscussions,
}) {
  const { data: session } = useSession();
  return (
    <DiscussionsPageLayout>
      <Grid xs={12}>
        <Grid.Container>
          {!activeDiscussion && (
            <>
              <Grid xs={12} justify='center'>
                <Text h3>Discussions</Text>
              </Grid>
              <Grid xs={12}>
                <Divider css={{ mt: '$9' }} />
              </Grid>
            </>
          )}
          <Grid.Container xs={12}>
            {!activeDiscussion &&
              discussions?.map((discussion) => (
                <DiscussionsSidebar
                  key={discussion.id}
                  discussion={discussion}
                  activeDiscussion={activeDiscussion}
                  setActiveDiscussion={setActiveDiscussion}
                  setReceiver={setReceiver}
                  session={session}
                />
              ))}
            {!discussions?.length && !isLoadingDiscussions && (
              <Grid xs={12} justify='center' css={{ mt: '$5' }}>
                <Text>No discussions found</Text>
              </Grid>
            )}
          </Grid.Container>
        </Grid.Container>
      </Grid>
      <Grid.Container
        xs={12}
        css={{
          flexDirection: 'column',
          '@mdMax': {
            height: 'calc(100vh - 180px)',
          },
        }}
      >
        {activeDiscussion && (
          <ChatArea
            messages={messages}
            session={session}
            activeDiscussion={activeDiscussion}
            setActiveDiscussion={setActiveDiscussion}
            receiver={receiver}
          />
        )}
      </Grid.Container>
    </DiscussionsPageLayout>
  );
}
