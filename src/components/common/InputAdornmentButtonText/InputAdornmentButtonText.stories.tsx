import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { InputAdornmentButtonText } from './InputAdornmentButtonText';
import { LinkIcon } from '../icons/LinkIcon';
import { InputAdornment } from '../InputAdornment/InputAdornment';
import { Input } from '../Input/Input';

const meta: Meta<typeof InputAdornmentButtonText> = {
  title: 'Design System/Components/InputAdornmentButtonText',
  tags: ['autodocs'],
  component: InputAdornmentButtonText,
};
export default meta;

type Story = StoryObj<typeof InputAdornmentButtonText>;

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
            style={{ paddingRight: '0.25rem' }}
            placeholder='www.example.com'
            endAdornment={
              <InputAdornment position='end'>
                <InputAdornmentButtonText
                  {...props}
                  title='Set Link'
                  onClick={handleClick}
                  endIcon={<LinkIcon />}
                />
              </InputAdornment>
            }
          />
        </div>
      </ThemeProviderWrapper>
    );
  },
};
