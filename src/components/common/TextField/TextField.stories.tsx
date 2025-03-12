import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type FunctionComponent, type ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { InputAdornment } from '../InputAdornment';
import { MenuItem } from '../MenuItem';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Design System/Components/TextField',
  tags: ['autodocs'],
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

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
      <TextField placeholder='Placeholder Text' />
    </StoryWrapper>
  ),
};

export const Label: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        label='Label'
        placeholder='Placeholder Text'
        value='Sample value'
      />
    </StoryWrapper>
  ),
};

export const HelperText: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        helperText='Helper text'
        label='Label'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const Error: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        error
        helperText='Error message'
        label='Label'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const Password: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <VisibilityOffIcon />
            </InputAdornment>
          ),
        }}
        label='Password'
        type='password'
      />
    </StoryWrapper>
  ),
};

export const Prefix: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>https://</InputAdornment>
          ),
        }}
        label='Url'
        placeholder='www.google.com'
      />
    </StoryWrapper>
  ),
};

export const Postfix: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
        }}
        type='number'
        label='Weight'
      />
    </StoryWrapper>
  ),
};

export const Postfix2: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position='end'>
                <VisibilityOffIcon />
              </InputAdornment>
              <InputAdornment position='end'>kg</InputAdornment>
            </>
          ),
          startAdornment: (
            <>
              <InputAdornment position='start'>https://</InputAdornment>
              <InputAdornment position='start'>
                <VisibilityOffIcon />
              </InputAdornment>
            </>
          ),
        }}
        label='Multiple prefix and postfix'
      />
    </StoryWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        disabled
        helperText='Helper text'
        label='Label'
        placeholder='Placeholder Text'
        value='Sample value'
      />
    </StoryWrapper>
  ),
};

export const HelperTextFullWidth: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        fullWidth
        helperText='Helper text'
        label='Label'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const Select: Story = {
  render: () =>
    (() => {
      const [value, setValue] = useState('banana');

      return (
        <StoryWrapper>
          <TextField
            helperText='Helper text'
            label='Label'
            onChange={(e) => setValue(e.target.value)}
            select
            value={value}
          >
            <MenuItem value='apple'>Apple</MenuItem>
            <MenuItem value='orange'>Orange</MenuItem>
            <MenuItem value='banana'>Banana</MenuItem>
            <MenuItem value='grape'>Grape</MenuItem>
          </TextField>
        </StoryWrapper>
      );
    })(),
};

export const HelperTextHorizontal: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        helperText='Helper text'
        label='Label'
        orientation='horizontal'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const ErrorHorizontal: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        error
        helperText='Error message'
        label='Label'
        orientation='horizontal'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const HelperTextHorizontalFullWidth: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        fullWidth
        helperText='Helper text'
        label='Label'
        orientation='horizontal'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};

export const ErrorHorizontalFullWidth: Story = {
  render: () => (
    <StoryWrapper>
      <TextField
        error
        fullWidth
        helperText='Error message'
        label='Label'
        orientation='horizontal'
        placeholder='Placeholder Text'
      />
    </StoryWrapper>
  ),
};
