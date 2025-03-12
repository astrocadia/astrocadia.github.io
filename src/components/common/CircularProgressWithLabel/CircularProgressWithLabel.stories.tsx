import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';

const meta: Meta<typeof CircularProgressWithLabel> = {
  title: 'Design System/Components/CircularProgressWithLabel',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  component: CircularProgressWithLabel,
};

export default meta;
type Story = StoryObj<typeof CircularProgressWithLabel>;

export const Default: Story = {
  args: {},
};

export const ActiveExample: Story = {
  render: (props) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);

    return <CircularProgressWithLabel {...props} value={progress} />;
  },
};
