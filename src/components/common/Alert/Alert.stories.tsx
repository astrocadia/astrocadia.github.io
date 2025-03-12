import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Design System/Components/Alert',
  tags: ['autodocs'],
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'grid', gap: 10 }}>
        <Alert severity='error'>This is an error alert — check it out!</Alert>
        <Alert severity='warning'>
          This is a warning alert — check it out!
        </Alert>
        <Alert severity='info'>This is an info alert — check it out!</Alert>
        <Alert severity='success'>
          This is a success alert — check it out!
        </Alert>
      </div>
    </ThemeProviderWrapper>
  ),
};
