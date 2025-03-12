import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { AlertCard } from './AlertCard';
import { GearIcon } from '../common/icons';

const onClick = () => {
  // eslint-disable-next-line no-alert
  alert("I have no idea what's going on...  😳");
};

const meta: Meta<typeof AlertCard> = {
  title: 'Design System/Composite Components/AlertCard',
  component: AlertCard,
  args: {
    userCount: 10,
    icon: GearIcon,
    title: 'Exhibit Health',
    subtitle: 'Updates to Exhibit health status',
    isCurrentUserIncluded: true,
    onClick: undefined,
    currentUser: {
      email: 'ttowel@deeplocal.com',
      firstName: 'Towelie',
      lastName: 'Towel',
      profile_image:
        'https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'var(--background-workspace-color)',
            padding: '2rem',
          }}
        >
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/TIkbnQjAOnz1BqhDFohAS5/Exhibit-Alerts?node-id=2275-16977&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertCard>;

export const Default: Story = {};

export const CurrentUserNotIncluded: Story = {
  args: {
    isCurrentUserIncluded: false,
  },
};

export const Button: Story = {
  args: {
    onClick,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const ButtonSelected: Story = {
  args: {
    selected: true,
    onClick,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const LongTitles: Story = {
  args: {
    title: 'Exhibit Health: Updates to Exhibit health status',
    subtitle:
      'This is a long subtitle to test how the card handles long strings of text.',
  },
};
