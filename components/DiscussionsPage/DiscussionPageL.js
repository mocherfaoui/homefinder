import { Divider, Grid, Text, User } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import ChatArea from '../ChatArea';
import DiscussionsSidebar from '../Discussions';
import DiscussionsPageLayout from '../Layout/DiscussionsPageLayout';

export default function DiscussionsPageL({
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
      <Grid
        xs={12}
        sm={3.5}
        css={{ d: 'block!important', borderRight: '1px solid $border' }}
      >
        <Grid.Container>
          <Grid xs={0} sm={12} css={{ ai: 'baseline' }}>
            <User
              css={{ px: '$sm', py: '$5' }}
              src={session?.user.image}
              name={session?.user.name}
              text={session?.user?.name?.split(' ')[0][0]}
              size='md'
            />
          </Grid>
          <Grid sm={12}>
            <Divider />
          </Grid>
          <Grid.Container xs={0} sm={12}>
            {discussions &&
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
      <Grid.Container xs={12} sm={8.5} css={{ flexDirection: 'column' }}>
        {activeDiscussion && (
          <ChatArea
            messages={messages}
            session={session}
            activeDiscussion={activeDiscussion}
            receiver={receiver}
          />
        )}
      </Grid.Container>
    </DiscussionsPageLayout>
  );
}
