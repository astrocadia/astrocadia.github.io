import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { CardButton } from './CardButton';

const meta: Meta<typeof CardButton> = {
  title: 'Design System/Composite Components/CardButton',
  component: CardButton,
  args: {
    children: (
      <div
        style={{
          margin: '1rem',
        }}
      >
        CardButton
      </div>
    ),
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert('I love lamp.');
    },
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardButton>;

export const Default: Story = {};
export const NoOnClick: Story = {
  args: {
    onClick: undefined,
  },
};
export const Selected: Story = {
  args: {
    selected: true,
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Note that right now the disabled state is only visual and does not prevent the onClick from firing.',
      },
    },
  },
};
