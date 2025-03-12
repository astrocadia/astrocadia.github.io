import type { Meta, StoryObj } from '@storybook/react';
import { ClockIcon } from '@mui/x-date-pickers';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { InputAdornmentButton } from './InputAdornmentButton';
import { InputAdornment } from '../InputAdornment/InputAdornment';
import { Input } from '../Input/Input';

const meta: Meta<typeof InputAdornmentButton> = {
  title: 'Design System/Components/InputAdornmentButton',
  tags: ['autodocs'],
  component: InputAdornmentButton,
};
export default meta;

type Story = StoryObj<typeof InputAdornmentButton>;

export const Default: Story = {
  render: ({ ...props }) => {
    const handleClick = () => {
      // eslint-disable-next-line no-alert
      alert('You clicked the button');
    };

    return (
      <ThemeProviderWrapper>
        <div>
          <Input
            endAdornment={
              <InputAdornment position='end'>
                <InputAdornmentButton {...props} onClick={handleClick}>
                  <ClockIcon />
                </InputAdornmentButton>
              </InputAdornment>
            }
          />
        </div>
      </ThemeProviderWrapper>
    );
  },
};
