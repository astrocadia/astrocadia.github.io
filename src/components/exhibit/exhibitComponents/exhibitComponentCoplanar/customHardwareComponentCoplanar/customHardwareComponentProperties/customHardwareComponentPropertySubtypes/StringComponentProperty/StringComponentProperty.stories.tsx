import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../../../../../../styles/helpers/ThemeProviderWrapper';
import { StringComponentProperty } from './StringComponentProperty';
import { type StringProperty } from '../../../../../../../../app/entities/exhibitComponents';

const property: StringProperty = {
  path: '',
  arrayLength: 40,
  type: 'gmbnd_primitive',
  subtype: 'StringProperty',
  desc: '',
  index: 0,
  format: '!s',
  gettable: true,
  settable: true,
  componentId: '1',
  min: 0,
  max: 100,
  uiHidden: false,
  source: 'app',
  value: [],
};

const meta: Meta<typeof StringComponentProperty> = {
  title: 'Michael Pflueger Portfolio/Inputs/StringComponentProperty',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An input for updating a Hardware String property.',
      },
    },
  },
  component: StringComponentProperty,
  args: {
    property: {
      ...property,
    },
    propertyName: 'String Property',
  },
  argTypes: {
    property: { control: { type: 'object' } },
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

    const resetUpdatePropertyMutation = () => {
      setIsSuccess(false);
    };

    const handleSendValue = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 500);
    };

    return (
      <StringComponentProperty
        {...args}
        onSendValue={handleSendValue}
        mutationStateAndActions={{
          isLoading,
          isSuccess,
          resetUpdatePropertyMutation,
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof StringComponentProperty>;

export const Default: Story = {};

export const StringValueReadOnly: Story = {
  args: {
    property: {
      ...property,
      settable: false,
      value: ['Sample text'],
    },
    propertyName: 'String Value ReadOnly',
  },
};
