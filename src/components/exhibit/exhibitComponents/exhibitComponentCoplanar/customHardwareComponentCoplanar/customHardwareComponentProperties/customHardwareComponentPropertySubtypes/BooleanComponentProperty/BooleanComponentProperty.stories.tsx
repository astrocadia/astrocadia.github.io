import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { useState, useCallback } from 'react';
import {
  addToast,
  ToastType,
} from '../../../../../../../../app/services/toast';
import { Toaster } from '../../../../../../../Toaster';
import { ThemeProviderWrapper } from '../../../../../../../../styles/helpers/ThemeProviderWrapper';
import { BooleanComponentProperty } from './BooleanComponentProperty';
import { type BooleanProperty } from '../../../../../../../../app/entities/exhibitComponents';
import { store, useAppDispatch } from '../../../../../../../../app/store';

const property: BooleanProperty = {
  path: '',
  arrayLength: 1,
  type: 'gmbnd_primitive',
  subtype: 'BooleanProperty',
  desc: '',
  index: 0,
  format: '!?',
  gettable: true,
  settable: true,
  componentId: '1',
  min: 0,
  max: 100,
  uiHidden: false,
  source: 'app',
  value: [false],
};

const meta: Meta<typeof BooleanComponentProperty> = {
  title: 'Michael Pflueger Portfolio/Inputs/BooleanComponentProperty',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An input for updating a Hardware Boolean property with accomodation for arrays of values and csv upload/download.',
      },
    },
  },
  component: BooleanComponentProperty,
  args: {
    property: {
      ...property,
    },
    propertyName: 'Single Boolean Property',
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
      <BooleanComponentProperty
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
type Story = StoryObj<typeof BooleanComponentProperty>;

export const Default: Story = {};

export const SingleBooleanValueReadOnly: Story = {
  args: {
    property: {
      ...property,
      settable: false,
      value: [true],
    },
    propertyName: 'Single Boolean Value ReadOnly',
  },
};

export const TwoBooleanArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 2,
      value: [false, true],
    },
    propertyName: 'Two Boolean Array',
  },
};

export const ThreeBooleanArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 3,
      value: [true, false, true],
    },
    propertyName: 'Three Boolean Array',
  },
};

export const ManyBooleanArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 150,
      value: Array(150).fill(false),
    },
    propertyName: 'Many Boolean Array',
  },
};

export const ManyBooleanArrayReadOnly: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 150,
      settable: false,
      value: Array(150).fill(false),
    },
    propertyName: 'Many Boolean Array ReadOnly',
  },
};
