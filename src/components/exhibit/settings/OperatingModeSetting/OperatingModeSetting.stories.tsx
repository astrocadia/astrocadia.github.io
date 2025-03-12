import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { OperatingModeSetting } from './OperatingModeSetting';

const meta: Meta<typeof OperatingModeSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/OperatingModeSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: OperatingModeSetting,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OperatingModeSetting>;

export const Default: Story = {
  args: {
    value: 'Off',
  },
};

export const On: Story = {
  args: {
    value: 'On',
  },
};

export const NoHelperText: Story = {
  args: {
    value: 'Off',
    hideHelperText: true,
  },
};

export const ModifiedOn: Story = {
  args: {
    value: 'Off',
    updatedValue: 'On',
  },
};

export const ModifiedOff: Story = {
  args: {
    value: 'On',
    updatedValue: 'Off',
  },
};

export const NoHelperTextModified: Story = {
  args: {
    value: 'Off',
    updatedValue: 'On',
    hideHelperText: true,
  },
};

export const DisabledOn: Story = {
  args: {
    value: 'On',
    disabled: true,
  },
};

export const DisabledOff: Story = {
  args: {
    value: 'Off',
    disabled: true,
  },
};
