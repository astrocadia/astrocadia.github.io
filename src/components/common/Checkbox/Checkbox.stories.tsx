import type { StoryObj, Meta } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

import { Checkbox } from './Checkbox';

const meta: Meta = {
  title: 'Design System/Components/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  argTypes: {},
} as Meta;
export default meta;

type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <Checkbox {...props} />
    </ThemeProviderWrapper>
  ),
};
