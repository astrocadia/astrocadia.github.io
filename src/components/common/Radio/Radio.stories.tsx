import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Radio, type RadioProps } from './Radio';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { ListItemIcon } from '../ListItemIcon';

const SIZES = ['small', 'medium'] as const;

const meta: Meta<typeof Radio> = {
  title: 'Design System/Components/Radio',
  tags: ['autodocs'],
  component: Radio,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'white',
          }}
        >
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: ({ onClick, ...args }) => {
    const [checked, setChecked] = useState(false);

    const handleClick: RadioProps['onClick'] = (event) => {
      setChecked(!checked);
      onClick?.(event);
    };

    return (
      <List>
        {SIZES.map((size) => (
          <ListItem key={size}>
            <ListItemIcon>
              <Radio
                key={size}
                {...args}
                name='size'
                size={size}
                onClick={handleClick}
                checked={checked}
              />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    );
  },
};
