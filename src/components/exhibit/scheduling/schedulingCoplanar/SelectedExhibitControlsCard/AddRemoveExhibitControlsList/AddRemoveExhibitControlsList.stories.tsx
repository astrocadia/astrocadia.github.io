import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Control } from '../../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../../styles/helpers/ThemeProviderWrapper';
import { AddRemoveExhibitControlsList } from './AddRemoveExhibitControlsList';

const meta: Meta<typeof AddRemoveExhibitControlsList> = {
  title:
    'Design System/Composite Components/Exhibit Scheduling/AddRemoveExhibitControlsList',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: AddRemoveExhibitControlsList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev',
    },
  },
  args: {
    controls: [
      {
        display: 'Example Control 1',
        manifestId: 'control_1',
        type: 'Single',
        id: 1,
      },
      {
        display: 'Example Control 2',
        manifestId: 'control_2',
        type: 'Single',
        id: 2,
      },
      {
        display: 'Example Control 3',
        manifestId: 'control_3',
        type: 'Single',
        id: 3,
      },
      {
        display: 'Example Control Group',
        manifestId: 'control_group',
        type: 'Group',
        id: 4,
        items: [
          {
            display: 'Example Group Control 1',
            id: 'control_group/group_control_1',
            uniqueId: 5,
          },
          {
            display: 'Example Group Control 2',
            id: 'control_group/group_control_2',
            uniqueId: 6,
          },
          {
            display: 'Example Group Control 3',
            id: 'control_group/group_control_3',
            uniqueId: 7,
          },
        ],
      },
    ] as Array<Control>,
  },
  render: ({ ...props }) => {
    const [selectedControls, setSelectedControls] = useState<Array<Control>>(
      []
    );

    return (
      <AddRemoveExhibitControlsList
        {...props}
        selectedControls={selectedControls}
        onSelectedControlsChange={setSelectedControls}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof AddRemoveExhibitControlsList>;

export const Default: Story = {};
