import type { Meta, StoryObj } from '@storybook/react';
import { MenuToggleButton } from './MenuToggleButton';
import { CalendarMonthIcon } from '../icons';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof MenuToggleButton> = {
  title: 'Design System/Components/MenuToggleButton',
  tags: ['autodocs'],
  component: MenuToggleButton,
};
export default meta;

const render = ({ ...props }) => (
  <ThemeProviderWrapper>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MenuToggleButton {...props}>Closed</MenuToggleButton>
      <MenuToggleButton open {...props}>
        Open
      </MenuToggleButton>
      <MenuToggleButton open {...props}>
        Open
      </MenuToggleButton>
      <MenuToggleButton disabled {...props}>
        Disabled
      </MenuToggleButton>
    </div>
  </ThemeProviderWrapper>
);

type Story = StoryObj<typeof MenuToggleButton>;
export const Default: Story = {
  args: {
    startIcon: <CalendarMonthIcon />,
  },
  render,
};
