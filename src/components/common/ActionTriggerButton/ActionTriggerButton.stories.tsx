import type { Meta, Parameters, StoryObj } from '@storybook/react';
import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import {
  ActionTriggerButton,
  type ActionTriggerButtonProps,
} from './ActionTriggerButton';

const meta: Meta<typeof ActionTriggerButton> = {
  title: 'Design System/Components/ActionTriggerButton',
  tags: ['autodocs'],
  component: ActionTriggerButton,
};

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/proto/0jimeeoOUb0jnANEyfRvW4/Component-Details?page-id=3322%3A52311&node-id=4013-32363&t=hapriD8UoqoSZYVc-0&scaling=min-zoom&content-scaling=fixed',
  },
};

export default meta;
type Story = StoryObj<typeof ActionTriggerButton>;

interface ActionTriggerButtonOnClickWrapperProps
  extends Omit<ActionTriggerButtonProps, 'onClick'> {
  onClickNetworkTimingMS?: 15 | 1000 | 5000;
}

export const ActionTriggerButtonOnClickWrapper: FunctionComponent<
  ActionTriggerButtonOnClickWrapperProps
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
    <ActionTriggerButton
      {...props}
      busy={isBusy}
      success={isSuccess}
      onClick={onClick}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <ActionTriggerButtonOnClickWrapper {...props} />
    </ThemeProviderWrapper>
  ),
  parameters,
};

export const MediumNetworkSimulation: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <ActionTriggerButtonOnClickWrapper
        onClickNetworkTimingMS={1000}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
  parameters,
};

export const SlowNetworkSimulation: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <ActionTriggerButtonOnClickWrapper
        onClickNetworkTimingMS={5000}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
  parameters,
};
