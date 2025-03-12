import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Design System/Components/Divider',
  tags: ['autodocs'],
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
          minHeight: '50px',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <Divider />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};
