import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { RadioGroup } from './RadioGroup';
import { FormControlLabel } from '../FormControlLabel';
import { Radio } from '../Radio/Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System/Components/RadioGroup',
  tags: ['autodocs'],
  component: RadioGroup,
  args: {},
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  render: ({ ...args }) => (
    <RadioGroup {...args}>
      <FormControlLabel value='female' control={<Radio />} label='Female' />
      <FormControlLabel value='male' control={<Radio />} label='Male' />
      <FormControlLabel value='other' control={<Radio />} label='Other' />
    </RadioGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
