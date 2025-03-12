import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { useState, useCallback } from 'react';
import {
  addToast,
  ToastType,
} from '../../../../../../../../app/services/toast';
import { Toaster } from '../../../../../../../Toaster';
import { ThemeProviderWrapper } from '../../../../../../../../styles/helpers/ThemeProviderWrapper';
import { NumberComponentProperty } from './NumberComponentProperty';
import { type NumberProperty } from '../../../../../../../../app/entities/exhibitComponents';
import { store, useAppDispatch } from '../../../../../../../../app/store';

const property: NumberProperty = {
  path: '',
  arrayLength: 1,
  type: 'gmbnd_primitive',
  subtype: 'NumberProperty',
  desc: '',
  index: 0,
  format: '!i',
  gettable: true,
  settable: true,
  componentId: '1',
  min: 0,
  max: 100,
  uiHidden: false,
  source: 'app',
};

const meta: Meta<typeof NumberComponentProperty> = {
  title: 'Michael Pflueger Portfolio/Inputs/NumberComponentProperty',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An input for updating a Hardware Number property with accomodation for arrays of values and csv upload/download.',
      },
    },
  },
  component: NumberComponentProperty,
  args: {
    property: {
      ...property,
    },
    propertyName: 'Single Number Property',
  },
  argTypes: {
    property: { control: { type: 'object' } },
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Provider store={store}>
          <div
            style={{
              height: '100vh',
              backgroundColor: 'var(--background-workspace-color)',
            }}
          >
            <div
              style={{
                width: '30rem',
                height: '100vh',
                padding:
                  'var(--content-padding-vertical) var(--content-padding-horizontal)',
              }}
            >
              <Story />
            </div>
            <Toaster />
          </div>
        </Provider>
      </ThemeProviderWrapper>
    ),
  ],
  render: (args) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [arraySubpage, setArraySubpage] = useState<boolean>(false);

    const handleSetArraySubpage = useCallback(() => setArraySubpage(true), []);
    const handleArraySubpageBack = useCallback(
      () => setArraySubpage(false),
      [setArraySubpage]
    );

    const handleAddToast = useCallback(
      (message: string, type: ToastType) => {
        dispatch(addToast({ message, type }));
      },
      [dispatch]
    );

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
      <NumberComponentProperty
        {...args}
        onSendValue={handleSendValue}
        mutationStateAndActions={{
          isLoading,
          isSuccess,
          resetUpdatePropertyMutation,
        }}
        onAddToast={handleAddToast}
        arraySubpage={arraySubpage}
        onSetArraySubpage={handleSetArraySubpage}
        onArraySubpageBack={handleArraySubpageBack}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof NumberComponentProperty>;

export const Default: Story = {};

export const SingleNumberValueReadOnly: Story = {
  args: {
    property: {
      ...property,
      settable: false,
      value: [42],
    },
    propertyName: 'Single Number Value ReadOnly',
  },
};

export const TwoNumberArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 2,
    },
    propertyName: 'Two Number Array',
  },
};

export const ThreeNumberArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 3,
    },
    propertyName: 'Three Number Array',
  },
};

export const ManyNumberArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 150,
      value: Array(150).fill(42),
    },
    propertyName: 'Many Number Array',
  },
};

export const ManyNumberArrayReadOnly: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 150,
      settable: false,
      value: Array(150).fill(42),
    },
    propertyName: 'Many Number Array ReadOnly',
  },
};
