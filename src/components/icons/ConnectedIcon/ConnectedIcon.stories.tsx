import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import {
  ConnectedIcon,
  CONNECTED_STATUS,
  ConnectedStatus,
} from './ConnectedIcon';

const statuses: Record<ConnectedStatus, string> = {
  [CONNECTED_STATUS.CONNECTED]: 'Connected',
  [CONNECTED_STATUS.DISCONNECTED]: 'Disconnected',
  [CONNECTED_STATUS.NEVER_CONNECTED]: 'Never Connected',
} as const;

const meta: Meta<typeof ConnectedIcon> = {
  title: 'Design System/Composite Components/ConnectedIcon',
  tags: ['autodocs'],
  component: ConnectedIcon,
};

export default meta;
type Story = StoryObj<typeof ConnectedIcon>;

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
        {Object.values(CONNECTED_STATUS).map((status) => (
          <IconWrapper key={status} title={statuses[status]}>
            <ConnectedIcon status={status} />
          </IconWrapper>
        ))}
      </div>
    </ThemeProviderWrapper>
  ),
};
