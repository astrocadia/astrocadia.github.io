import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../../styles/helpers/ThemeProviderWrapper';
import { CheckIcon } from '../../../../../common/icons';
import { addRemoveButtonProps } from '../addRemoveButtonProps';
import { ScheduleSelectedPropertiesCard } from './ScheduleSelectedPropertiesCard';

const meta: Meta<typeof ScheduleSelectedPropertiesCard> = {
  title:
    'Design System/Composite Components/Exhibit Scheduling/ScheduleSelectedPropertiesCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ScheduleSelectedPropertiesCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev',
    },
  },
  args: {
    badgeProps: { Icon: CheckIcon },
    label: 'ScheduleSelectedPropertiesCard',
    buttonProps: addRemoveButtonProps,
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleSelectedPropertiesCard>;

export const Default: Story = {};

export const WithChildren: Story = {
  args: {
    children: (
      <div
        style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
      />
    ),
  },
};

export const Siblings: Story = {
  render: (props) => {
    return (
      <>
        <ScheduleSelectedPropertiesCard {...props} />
        <ScheduleSelectedPropertiesCard {...props}>
          <div
            style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
          />
        </ScheduleSelectedPropertiesCard>
        <ScheduleSelectedPropertiesCard {...props} />
      </>
    );
  },
};
