import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Input } from './Input';
import { InputAdornment } from '../InputAdornment';

const meta: Meta<typeof Input> = {
  title: 'Design System/Components/Input',
  tags: ['autodocs'],
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

const StoryWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <ThemeProviderWrapper>
    <div style={{ display: 'flex', gap: 10 }}>{children}</div>
  </ThemeProviderWrapper>
);

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <Input placeholder='Placeholder Text' />
    </StoryWrapper>
  ),
};

export const Error: Story = {
  render: () => (
    <StoryWrapper>
      <Input error placeholder='Placeholder Text' />
    </StoryWrapper>
  ),
};

export const ErrorWithIcon: Story = {
  render: () => (
    <StoryWrapper>
      <Input
        endAdornment={
          <InputAdornment position='end'>
            <VisibilityOffIcon />
          </InputAdornment>
        }
        error
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const Password: Story = {
  render: () => (
    <StoryWrapper>
      <Input
        endAdornment={
          <InputAdornment position='end'>
            <VisibilityOffIcon />
          </InputAdornment>
        }
        type='password'
      />
    </StoryWrapper>
  ),
};

export const Prefix: Story = {
  render: () => (
    <StoryWrapper>
      <Input
        startAdornment={
          <InputAdornment position='start'>https://</InputAdornment>
        }
        placeholder='www.google.com'
      />
    </StoryWrapper>
  ),
};

export const Postfix: Story = {
  render: () => (
    <StoryWrapper>
      <Input
        endAdornment={<InputAdornment position='end'>kg</InputAdornment>}
        type='number'
      />
    </StoryWrapper>
  ),
};

export const MultiplePrefixAndPostfix: Story = {
  render: () => (
    <StoryWrapper>
      <Input
        endAdornment={
          <>
            <InputAdornment position='end'>
              <VisibilityOffIcon />
            </InputAdornment>
            <InputAdornment position='end'>kg</InputAdornment>
          </>
        }
        startAdornment={
          <>
            <InputAdornment position='start'>https://</InputAdornment>
            <InputAdornment position='start'>
              <VisibilityOffIcon />
            </InputAdornment>
          </>
        }
      />
    </StoryWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <StoryWrapper>
      <Input disabled value='Disabled value' />
    </StoryWrapper>
  ),
};
