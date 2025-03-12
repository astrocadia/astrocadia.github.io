import { SvgIcon } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import * as Icons from '.';
import { sortCompareStringWithNumbersIgnoreCase } from '../../../utils/sort';
import '../../../styles/base.css';

const ignoredIcons = ['SvgIcon'];
const filteredIcons = Object.entries(Icons)
  .filter(([name]) => !ignoredIcons.includes(name))
  // Sorts the icons by alphabetical order
  .sort((a, b) => {
    const aName = a[0];
    const bName = b[0];
    return sortCompareStringWithNumbersIgnoreCase(aName, bName);
  });

const meta: Meta<typeof SvgIcon> = {
  title: 'Design System/Icons',
  tags: ['autodocs'],
  component: SvgIcon,
};

export default meta;
type Story = StoryObj<typeof SvgIcon>;

const IconWrapper: FunctionComponent<{
  children: ReactNode;
  title: string;
}> = ({ children, title }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--typography-secondary-color)',
    }}
  >
    <div
      style={{
        textAlign: 'center',
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
        {filteredIcons.map(([name, Icon]) => (
          <IconWrapper title={name} key={name}>
            <Icon />
          </IconWrapper>
        ))}
      </div>
    </ThemeProviderWrapper>
  ),
};
