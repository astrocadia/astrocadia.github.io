import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { ComponentDetailsHeader } from './ComponentDetailsHeader';
import { SoftwareComponentIcon } from '../common/icons';

const meta: Meta<typeof ComponentDetailsHeader> = {
  title: 'Design System/Composite Components/ComponentDetailsHeader',
  tags: ['autodocs'],
  component: ComponentDetailsHeader,
};

export default meta;
type Story = StoryObj<typeof ComponentDetailsHeader>;

export const Default: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
          }}
        >
          <ComponentDetailsHeader
            title='Component Details Header Title'
            subtitle='Header Subtitle'
            subtitleIcon={<SoftwareComponentIcon />}
          />
        </div>
      </ThemeProviderWrapper>
    );
  },
};
