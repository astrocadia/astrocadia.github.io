import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { useState, useCallback } from 'react';
import {
  addToast,
  ToastType,
} from '../../../../../../../../app/services/toast';
import { Toaster } from '../../../../../../../Toaster';
import { ThemeProviderWrapper } from '../../../../../../../../styles/helpers/ThemeProviderWrapper';
import { ColorComponentProperty } from './ColorComponentProperty';
import {
  type ColorProperty,
  ColorPropertyValue,
} from '../../../../../../../../app/entities/exhibitComponents';
import { store, useAppDispatch } from '../../../../../../../../app/store';

const property: ColorProperty = {
  path: '',
  arrayLength: 1,
  type: 'gmbnd_color',
  desc: '',
  index: 0,
  format: '!4B',
  gettable: true,
  settable: true,
  componentId: '1',
  uiHidden: false,
  source: 'app',
};

const meta: Meta<typeof ColorComponentProperty> = {
  title:
    'Design System/Composite Components/Hardware Properties/ColorComponentProperty',
  tags: ['autodocs'],
  component: ColorComponentProperty,
  args: {
    property: {
      ...property,
    },
    propertyName: 'Single Color Property',
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
                padding:
                  'var(--content-padding-vertical) var(--content-padding-horizontal)',
                height: '100vh',
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
      <ColorComponentProperty
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
type Story = StoryObj<typeof ColorComponentProperty>;

export const Default: Story = {};

export const SingleColorValueReadOnly: Story = {
  args: {
    property: {
      ...property,
      settable: false,
      value: [
        { white: 255, red: 0, green: 255, blue: 255 } as ColorPropertyValue,
      ],
    },
    propertyName: 'Single Color Value ReadOnly',
  },
};

export const TwoColorArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 2,
    },
    propertyName: 'Two Color Array',
  },
};

export const ThreeColorArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 3,
    },
    propertyName: 'Three Color Array',
  },
};

export const ManyColorArray: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 150,
      value: Array(150).fill({
        white: 255,
        red: 255,
        green: 0,
        blue: 255,
      } as ColorPropertyValue),
    },
    propertyName: 'Many Color Array',
  },
};

export const ManyColorArrayReadOnly: Story = {
  args: {
    property: {
      ...property,
      arrayLength: 150,
      settable: false,
      value: Array(150).fill({
        white: 255,
        red: 255,
        green: 255,
        blue: 0,
      } as ColorPropertyValue),
    },
    propertyName: 'Many Color Array ReadOnly',
  },
};
