import type { Meta, StoryObj } from '@storybook/react';
import {
  MainPanelCoplanarTitle,
  type MainPanelCoplanarTitleProps,
} from './MainPanelCoplanarTitle';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Button } from '../../../common/buttons';
import { PlusIcon } from '../../../common/icons';

const meta: Meta<typeof MainPanelCoplanarTitle> = {
  title:
    'Design System/Composite Components/MainPanelCoplanar/MainPanelCoplanarTitle',
  tags: ['autodocs'],
  component: MainPanelCoplanarTitle,
  args: {
    onBack: () => {
      // eslint-disable-next-line no-alert
      alert('Back button clicked');
    },
    onClose: () => {
      // eslint-disable-next-line no-alert
      alert('Close button clicked');
    },
    titleText: 'Component Name',
    subtitleText: 'Subpage Title',
    captionText: 'Lorem ipsum dolor sit amet consectetur.',
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProviderWrapper>
          <div
            style={{
              backgroundColor: 'white',
              padding: '16px',
            }}
          >
            <Story />
          </div>
        </ThemeProviderWrapper>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MainPanelCoplanarTitle>;

export const Default: Story = {};

export const JustNav: Story = {
  args: {
    titleText: 'Component Name',
    onBack: undefined,
    subtitleText: undefined,
    captionText: undefined,
  },
};

const ChimesProps: MainPanelCoplanarTitleProps = {
  titleText: 'L4 Chimes 7',
  subtitleText: 'Controls',
  captionText: 'Send updates to the component in real-time',
};

export const Chimes: Story = {
  args: ChimesProps,
  name: 'L4 Chimes 7',
};

const Action = () => {
  const onClick = () => {
    // eslint-disable-next-line no-alert
    alert('Action button clicked');
  };

  return (
    <Button startIcon={<PlusIcon />} variant='primary' onClick={onClick}>
      Action
    </Button>
  );
};

export const ChimesWithAction: Story = {
  args: {
    ...ChimesProps,
    actions: <Action />,
  },
  name: 'L4 Chimes 7 with Action',
};
