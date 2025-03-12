import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { SelectedExhibitControlsCard } from './SelectedExhibitControlsCard';
import { Control } from '../../../../../app/entities/exhibitManifest';

const meta: Meta<typeof SelectedExhibitControlsCard> = {
  title:
    'Design System/Composite Components/Exhibit Scheduling/SelectedExhibitControlsCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: SelectedExhibitControlsCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev',
    },
  },
  args: {
    selectedControls: [],
    onButtonClick: () => {
      // eslint-disable-next-line no-alert
      alert('Button clicked');
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectedExhibitControlsCard>;

export const Default: Story = {};
export const WithSelectedControls: Story = {
  args: {
    selectedControls: [
      {
        display: 'Example Control 1',
        type: 'Single',
        id: 1,
      },
      {
        display: 'Example Control 2',
        type: 'Single',
        id: 2,
      },
      {
        display: 'Example Control 3',
        type: 'Single',
        id: 3,
      },
      {
        display: 'Example Control Group',
        type: 'Group',
        id: 4,
        items: [
          {
            display: 'Example Group Control 1',
            type: 'Single',
            id: '5',
          },
          {
            display: 'Example Group Control 2',
            type: 'Single',
            id: '6',
          },
          {
            display: 'Example Group Control 3',
            type: 'Single',
            id: '7',
          },
        ],
      },
    ] as unknown as Array<Control>,
  },
};
