import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import {
  RadioButtonGroup,
  type RadioButtonGroupProps,
} from './RadioButtonGroup';

const options: RadioButtonGroupProps['options'] = [
  {
    value: 'kyle',
    title: 'Kyle Brovlofski',
    description: 'You bastards!',
  },
  {
    value: 'stan',
    title: 'Stan Marsh',
    description: 'Aw, weak, dude.',
  },
  {
    value: 'kenny',
    title: 'Kenny McCormick',
    description: 'Mmmph mmmph mph mph mmmph!',
  },
  {
    value: 'cartman',
    title: 'Eric Cartman',
    description: 'Respect my authoritah!',
  },
];

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Design System/Composite Components/RadioButtonGroup',
  tags: ['autodocs'],
  component: RadioButtonGroup,
  args: {
    options,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return <RadioButtonGroup {...args} value={value} onChange={setValue} />;
  },
};
