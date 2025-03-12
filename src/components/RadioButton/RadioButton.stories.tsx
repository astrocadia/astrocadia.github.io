import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Design System/Composite Components/RadioButton',
  tags: ['autodocs'],
  component: RadioButton,
  args: {
    title: 'RadioButton',
    description:
      'Description blocks are like the awkward small talk at a party, trying their best to make everything sound interesting but sometimes ending up sounding a bit ridiculous.',
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'white',
          }}
        >
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  render: (args) => {
    const [state, setState] = useState(false);
    return (
      <RadioButton {...args} checked={state} onClick={() => setState(!state)} />
    );
  },
};
