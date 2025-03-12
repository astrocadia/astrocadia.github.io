import type { Meta, Parameters, StoryObj } from '@storybook/react';
import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import {
  ActionTriggerCard,
  type ActionTriggerCardProps,
} from './ActionTriggerCard';

const meta: Meta<typeof ActionTriggerCard> = {
  title: 'Design System/Components/ActionTriggerCard',
  tags: ['autodocs'],
  component: ActionTriggerCard,
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
type Story = StoryObj<typeof ActionTriggerCard>;

interface ActionTriggerCardOnClickWrapperProps
  extends Omit<ActionTriggerCardProps, 'onClick'> {
  onClickNetworkTimingMS?: 15 | 1000 | 5000;
}

export const ActionTriggerCardOnClickWrapper: FunctionComponent<
  ActionTriggerCardOnClickWrapperProps
> = ({ onClickNetworkTimingMS = 15, busy = false, ...props }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(busy);
  const onClick = useCallback(() => {
    setIsSuccess(false);
    setIsBusy(true);
    setTimeout(() => {
      setIsBusy(false);
      setIsSuccess(true);
    }, onClickNetworkTimingMS);
  }, [onClickNetworkTimingMS]);

  useEffect(() => {
    setIsBusy(busy);
  }, [busy]);

  return (
    <ActionTriggerCard
      {...props}
      busy={isBusy}
      success={isSuccess}
      onClick={onClick}
    />
  );
};

export const Default: Story = {
  render: ({ label = 'Default sample label', ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: '10px',
          alignItems: 'center',
        }}
      >
        <ActionTriggerCardOnClickWrapper label={label} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
  parameters,
};

export const MediumNetworkSimulation: Story = {
  render: ({ label = 'Default sample label', ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          padding: '10px',
        }}
      >
        <ActionTriggerCardOnClickWrapper
          label={label}
          onClickNetworkTimingMS={1000}
          {...props}
        />
      </div>
    </ThemeProviderWrapper>
  ),
  parameters,
};

export const SlowNetworkSimulation: Story = {
  render: ({ label = 'Default sample label', ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: '10px',
          alignItems: 'center',
        }}
      >
        <ActionTriggerCardOnClickWrapper
          label={label}
          onClickNetworkTimingMS={5000}
          {...props}
        />
      </div>
    </ThemeProviderWrapper>
  ),
  parameters,
};
