import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { OperatingModeIcon } from './OperatingModeIcon';

const meta: Meta<typeof OperatingModeIcon> = {
  title: 'Design System/Composite Components/OperatingModeIcon',
  tags: ['autodocs'],
  component: OperatingModeIcon,
};

export default meta;
type Story = StoryObj<typeof OperatingModeIcon>;

const IconWrapper: FunctionComponent<{
  children: ReactNode;
  title: string;
}> = ({ children, title }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--typography-secondary-color)',
      alignItems: 'center',
      gap: 4,
    }}
  >
    <div
      style={{
        alignItems: 'center',
        fontSize: '1.5rem',
      }}
    >
      {children}
    </div>
    <div style={{ textAlign: 'center' }}>{title}</div>
  </div>
);

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}
      >
        <IconWrapper key='On' title='On'>
          <OperatingModeIcon opMode='On' />
        </IconWrapper>
        <IconWrapper key='Off' title='Off'>
          <OperatingModeIcon opMode='Off' />
        </IconWrapper>
      </div>
    </ThemeProviderWrapper>
  ),
};
