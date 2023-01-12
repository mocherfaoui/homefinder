import NextLink from 'next/link';
import { Card, Link, Text } from '@nextui-org/react';

export function NoAgencyWarning() {
  return (
    <Card
      variant='bordered'
      css={{ bc: '$warning', w: 'fit-content', h: 'fit-content' }}
    >
      <Card.Body css={{ jc: 'center' }}>
        <Text
          span
          weight='semibold'
          css={{
            color: '$white',
            ta: 'center',
            '@md': { fs: '$base' },
            fs: '$xl',
          }}
        >
          You don't have an agency yet, switch to an agency account from{' '}
          <NextLink href='/agency/new' passHref>
            <Link underline>here.</Link>
          </NextLink>
        </Text>
      </Card.Body>
    </Card>
  );
}
