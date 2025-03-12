import type { Meta, Parameters, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ActionTriggerCardList } from './ActionTriggerCardList';
import { ActionTriggerCardOnClickWrapper } from '../ActionTriggerCard/ActionTriggerCard.stories';

const meta: Meta<typeof ActionTriggerCardList> = {
  title: 'Design System/Components/ActionTriggerCardList',
  tags: ['autodocs'],
  component: ActionTriggerCardList,
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
};

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9tFaCazTy4LxuJ69xp8D7g/Exhibit-Controls?type=design&node-id=348-8170&mode=design&t=k0PStBO403vTBnpA-0',
  },
};

export default meta;
type Story = StoryObj<typeof ActionTriggerCardList>;

export const Default: Story = {
  render: ({ title = 'Default sample title', ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          padding: '10px',
        }}
      >
        <ActionTriggerCardList title={title} {...props}>
          <ActionTriggerCardOnClickWrapper fullWidth label='Control A' />
          <ActionTriggerCardOnClickWrapper fullWidth label='Control B' />
          <ActionTriggerCardOnClickWrapper fullWidth label='Control C' />
          <ActionTriggerCardOnClickWrapper fullWidth label='Control D' />
          <ActionTriggerCardOnClickWrapper fullWidth label='Control E' />
          <ActionTriggerCardOnClickWrapper fullWidth label='Control F' />
        </ActionTriggerCardList>
      </div>
    </ThemeProviderWrapper>
  ),
  parameters,
};
