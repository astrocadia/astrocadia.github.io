import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { FormControlLabel } from './FormControlLabel';
import { Radio } from '../Radio';

const meta: Meta<typeof FormControlLabel> = {
  title: 'Design System/Components/FormControlLabel',
  tags: ['autodocs'],
  component: FormControlLabel,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  args: {
    label: 'Label',
    control: <Radio />,
  },
};

export default meta;
type Story = StoryObj<typeof FormControlLabel>;

export const Default: Story = {};
