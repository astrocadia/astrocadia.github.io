import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../../../../../../styles/helpers/ThemeProviderWrapper';
import { TriggerComponentProperty } from './TriggerComponentProperty';

const meta: Meta<typeof TriggerComponentProperty> = {
  title: 'Michael Pflueger Portfolio/Inputs/TriggerComponentProperty',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A button for updating a Hardware Trigger property.',
      },
    },
  },
  component: TriggerComponentProperty,
  args: {
    propertyName: 'Trigger Property',
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div style={{ width: '30rem' }}>
          <div
            style={{
              padding:
                'var(--content-padding-vertical) var(--content-padding-horizontal)',
            }}
          >
            <Story />
          </div>
        </div>
      </ThemeProviderWrapper>
    ),
  ],
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleSendValue = () => {
      setIsLoading(true);
      setIsSuccess(false);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 500);
    };

    return (
      <TriggerComponentProperty
        {...args}
        onSendValue={handleSendValue}
        loading={isLoading}
        success={isSuccess}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof TriggerComponentProperty>;

export const Default: Story = {};
