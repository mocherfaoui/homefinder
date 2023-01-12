import { BiHomeHeart } from 'react-icons/bi';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdManageSearch } from 'react-icons/md';
import { Card, Grid, Text } from '@nextui-org/react';

import { FeatureIcon, FlexText } from '@/components/shared';

export function Features() {
  const features = [
    {
      icon: <MdManageSearch />,
      title: 'Find the perfect property',
      description: 'We have various types of properties to choose from.',
      gradient:
        '32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%',
      iconColor: 'rgba(51, 142, 218, 0.9)',
    },
    {
      icon: <BsCheck2Circle />,
      title: 'After sale services',
      description: 'We offer after sale services to our clients.',
      gradient: 'to bottom, $orange7 0%, $red600 100%',
      iconColor: '$red600',
    },
    {
      icon: <BiHomeHeart />,
      title: 'Sell or Rent your Property',
      description:
        'You can switch to an agency account to sell or rent your property.',
      gradient: '-32deg, $purple700 0%, $pink600 100%',
      iconColor: '$purple700',
    },
  ];
  return (
    <Grid.Container as='section' css={{ my: '$15' }}>
      <Grid xs={12} justify='center'>
        <Text
          h2
          size={40}
          css={{
            ta: 'center',
            mb: '$10',

            '@md': {
              fs: '50px',
            },
          }}
        >
          How HomeFinder can{' '}
          <Text
            span
            css={{
              fs: 'inherit',
              p: '$3',
              br: '$sm',
              bg: '$purple700',
              color: '$white',
            }}
          >
            help
          </Text>{' '}
          you
        </Text>
      </Grid>
      <Grid xs={12}>
        <Grid.Container gap={2} css={{ px: 0 }}>
          {features.map(
            ({ icon, title, description, gradient, iconColor }, index) => (
              <Grid xs={12} sm={4} key={index}>
                <Card
                  variant='bordered'
                  isHoverable
                  borderWeight='light'
                  css={{ linearGradient: gradient }}
                >
                  <Card.Body
                    css={{
                      p: '$15 $10',
                      '@md': {
                        p: '$18 $10',
                      },
                    }}
                  >
                    <FlexText
                      as='div'
                      css={{ ai: 'baseline', fd: 'column', gap: '$7' }}
                    >
                      <FeatureIcon css={{ color: iconColor }}>
                        {icon}
                      </FeatureIcon>
                      <Text h3 size={23} weight='bold' color='$white'>
                        {title}
                      </Text>
                      <Text
                        size={20}
                        color='$white'
                        weight='medium'
                        css={{ mt: '$4' }}
                      >
                        {description}
                      </Text>
                    </FlexText>
                  </Card.Body>
                </Card>
              </Grid>
            )
          )}
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}
