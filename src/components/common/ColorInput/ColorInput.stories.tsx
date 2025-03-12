import type { Meta, StoryObj } from '@storybook/react';
import { useState, FunctionComponent } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ColorInput, ColorInputProps } from './ColorInput';

const meta: Meta<typeof ColorInput> = {
  title: 'Design System/Components/ColorInput',
  tags: ['autodocs'],
  component: ColorInput,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  argTypes: {
    format: {
      control: { type: 'text' },
    },
    changed: {
      control: 'boolean',
    },
  },
};

const ColorInputWithState: FunctionComponent<ColorInputProps> = (props) => {
  const [value, setValue] = useState<string>('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return <ColorInput {...props} value={value} onChange={handleChange} />;
};

export default meta;
type Story = StoryObj<typeof ColorInput>;

export const Default: Story = {
  render: (props) => (
    <ColorInputWithState isAlphaHidden format='hex' {...props} />
  ),
};

export const WithAlpha: Story = {
  render: (props) => <ColorInputWithState format='hex8' {...props} />,
};

export const WithDot: Story = {
  render: (props) => <ColorInputWithState changed format='hex8' {...props} />,
};
