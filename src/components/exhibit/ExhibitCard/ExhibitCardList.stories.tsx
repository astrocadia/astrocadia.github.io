import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../views/routes/helpers/stories/RouteWrapper';
import { CardList } from '../../common/CardList';
import { ExhibitCard } from './ExhibitCard';
import { ExhibitCardSkeleton } from './ExhibitCardSkeleton';

const meta: Meta<typeof CardList> = {
  title: 'Design System/Composite Components/ExhibitCard/CardList',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <Story />
        </RouteWrapper>
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: CardList,
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const CardListExample: Story = {
  render: (args) => (
    <CardList {...args}>
      <ExhibitCard
        exhibitId={0}
        name='Lorem ipsum dolor sit'
        healthState='SOME_CONNECTIONS_OK'
        numberDisconnectedComponents={1}
      />
      <ExhibitCard
        exhibitId={1}
        name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
        healthState='SOME_CONNECTIONS_OK'
        numberDisconnectedComponents={1}
      />
      <ExhibitCard
        exhibitId={3}
        name='Lorem ipsum dolor sit amet'
        healthState='SOME_CONNECTIONS_OK'
        numberDisconnectedComponents={1}
      />
      <ExhibitCard
        exhibitId={3}
        name='Lorem, ipsum dolor.'
        healthState='SOME_CONNECTIONS_OK'
        numberDisconnectedComponents={1}
      />
      <ExhibitCard
        exhibitId={4}
        name='Lorem ipsum dolor sit amet consectetur adipisicing elit'
        healthState='SOME_CONNECTIONS_OK'
        numberDisconnectedComponents={1}
      />
      <ExhibitCardSkeleton />
    </CardList>
  ),
};
