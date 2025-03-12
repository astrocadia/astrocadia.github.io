import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { SettingLabelWrapper } from './SettingLabelWrapper';

const meta: Meta<typeof SettingLabelWrapper> = {
  title:
    'Design System/Composite Components/Exhibit Settings/SettingLabelWrapper',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: SettingLabelWrapper,
};

export default meta;
type Story = StoryObj<typeof SettingLabelWrapper>;

export const Default: Story = {
  args: {
    children: 'SettingLabelWrapper sample',
  },
};
