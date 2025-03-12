import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { CheckIcon } from '../../icons';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Components/Badge',
  tags: ['autodocs'],
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: ({ Icon = CheckIcon, ...props }) => (
    <ThemeProviderWrapper>
      <div style={{ padding: '5rem', backgroundColor: 'white' }}>
        <Badge Icon={Icon} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Circular: Story = {
  render: ({ Icon = CheckIcon, variant = 'circle', ...props }) => (
    <ThemeProviderWrapper>
      <div style={{ padding: '5rem', backgroundColor: 'white' }}>
        <Badge Icon={Icon} variant={variant} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const RoundedWithLabel: Story = {
  render: ({ Icon = CheckIcon, label = 'Sample Label', ...props }) => (
    <ThemeProviderWrapper>
      <div style={{ padding: '5rem', backgroundColor: 'white' }}>
        <Badge Icon={Icon} label={label} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const CircularWithLabel: Story = {
  render: ({
    Icon = CheckIcon,
    label = 'Sample Label',
    variant = 'circle',
    ...props
  }) => (
    <ThemeProviderWrapper>
      <div style={{ padding: '5rem', backgroundColor: 'white' }}>
        <Badge Icon={Icon} label={label} variant={variant} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LongLabel: Story = {
  render: ({ Icon = CheckIcon, label = 'Sample Label', ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{ padding: '5rem', backgroundColor: 'white', maxWidth: '16rem' }}
      >
        <Badge Icon={Icon} label={label} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const RoundedWithLabelOnly: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          padding: '5rem',
          backgroundColor: 'white',
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Badge label='Sample Label' />
        <Badge label='5' />
        <Badge label='105' />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const CircularWithLabelOnly: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          padding: '5rem',
          backgroundColor: 'white',
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Badge label='Sample Label' variant='circle' />
        <Badge label='5' variant='circle' />
        <Badge label='105' variant='circle' />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Empty: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          padding: '5rem',
          backgroundColor: 'white',
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Badge />
        <Badge variant='circle' />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Large: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          padding: '5rem',
          backgroundColor: 'white',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Badge Icon={CheckIcon} size='large' />
        <Badge Icon={CheckIcon} variant='circle' size='large' />
        <Badge Icon={CheckIcon} size='large' label='Sample Label' />
        <Badge
          Icon={CheckIcon}
          variant='circle'
          size='large'
          label='Sample Label'
        />
        <Badge size='large' label='Sample Label' />
        <Badge label='S' size='large' />
        <Badge variant='circle' size='large' label='Sample Label' />
        <Badge label='S' variant='circle' size='large' />
        <Badge size='large' />
        <Badge variant='circle' size='large' />
      </div>
    </ThemeProviderWrapper>
  ),
};
