import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { MenuButton } from './MenuButton';

const meta: Meta<typeof MenuButton> = {
  title: 'Design System/Components/MenuButton',
  tags: ['autodocs'],
  component: MenuButton,
};
export default meta;

type Story = StoryObj<typeof MenuButton>;
export const Default: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <MenuButton {...props}>Default</MenuButton>
      <MenuButton {...props} disabled>
        Disabled
      </MenuButton>
      <MenuButton {...props} size='small'>
        Small
      </MenuButton>
      <MenuButton {...props} size='small' disabled>
        Disabled Small
      </MenuButton>
    </ThemeProviderWrapper>
  ),
};
