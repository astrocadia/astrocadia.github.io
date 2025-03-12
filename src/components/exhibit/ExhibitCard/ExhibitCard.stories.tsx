import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../views/routes/helpers/stories/RouteWrapper';
import { ExhibitCard } from './ExhibitCard';

const meta: Meta<typeof ExhibitCard> = {
  title: 'Michael Pflueger Portfolio/Card/ExhibitCard',
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
  parameters: {
    docs: {
      description: {
        component: 'A card for selecting exhibits.',
      },
    },
  },
  component: ExhibitCard,
};

export default meta;
type Story = StoryObj<typeof ExhibitCard>;

export const Default: Story = {
  args: {
    exhibitId: 1,
    healthState: 'ALL_CONNECTIONS_OK',
    name: 'Lorem ipsum dolor sit',
    numberDisconnectedComponents: 1,
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium',
  },
};

export const SingleDisconnectedComponents: Story = {
  args: {
    ...Default.args,
    healthState: 'SOME_CONNECTIONS_OK',
    numberDisconnectedComponents: 1,
  },
};

export const MultipleDisconnectedComponents: Story = {
  args: {
    ...SingleDisconnectedComponents.args,
    numberDisconnectedComponents: 2,
  },
};

export const AllDisconnectedComponents: Story = {
  args: {
    ...Default.args,
    healthState: 'NO_CONNECTIONS',
    numberDisconnectedComponents: 2,
  },
};
