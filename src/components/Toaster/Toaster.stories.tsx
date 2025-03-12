import type { Meta, StoryObj } from '@storybook/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { Toaster } from './Toaster';
import {
  addToast,
  closeToast,
  DEFAULT_AUTO_HIDE_DURATION,
  selectToasts,
  TOAST_TYPE_DURATIONS,
  TOAST_TYPES,
  type ToastDuration,
  type ToastType,
} from '../../app/services/toast';
import { Button } from '../common/buttons';
import { SelectWithRemove } from '../SelectWithRemove';
import { TextField } from '../common/TextField';
import { store } from '../../app/store';

const formatLabel = (severityType: ToastType) => {
  const uppercased = severityType[0].toUpperCase() + severityType.slice(1);
  const formatted = uppercased.replace(/_/g, ' ');

  return formatted;
};

const options = Object.values(TOAST_TYPES).map((severityType) => ({
  value: severityType,
  label: formatLabel(severityType),
}));

const meta: Meta<typeof Toaster> = {
  title: 'Design System/Composite Components/Toaster',
  component: Toaster,
  argTypes: {
    maxToasts: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Provider store={store}>
          <Story />
        </Provider>
      </ThemeProviderWrapper>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  render: (args) => {
    const [type, setType] = useState<ToastType>('info');
    const [message, setMessage] = useState<string>('This is a toast message');

    const dispatch = useDispatch();
    const toasts = useSelector(selectToasts);

    const loadingToast = useMemo(
      () => toasts.find((toast) => toast.type === 'loading'),
      [toasts]
    );

    const autohideDuration = useMemo(() => {
      const toastDuration: ToastDuration = TOAST_TYPE_DURATIONS[type];
      const duration =
        toastDuration === undefined
          ? DEFAULT_AUTO_HIDE_DURATION
          : toastDuration;

      if (toastDuration === null) {
        return 'None';
      }

      return `${duration}ms`;
    }, [type]);

    const handleAddToast = useCallback(() => {
      dispatch(addToast({ message, type }));
    }, [dispatch, message, type]);

    const handleStopLoading = useCallback(() => {
      if (loadingToast) {
        dispatch(closeToast(loadingToast.id));
      }
    }, [dispatch, loadingToast]);

    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: 'var(--background-workspace-color)',
          padding: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'stretch',
            marginBottom: '1rem',
            alignItems: 'flex-end',
            gap: '1rem',
          }}
        >
          <TextField
            label='Message'
            value={message}
            onChange={(event) => setMessage(event?.target.value)}
            style={{ flexGrow: 1 }}
            InputProps={{ style: { width: '100%' } }}
          />
          <SelectWithRemove
            label='Type'
            options={options}
            value={type}
            onChange={setType}
            style={{ width: 200 }}
            InputProps={{ style: { width: '100%' } }}
          />
          <Button
            onClick={handleAddToast}
            variant='secondary'
            disabled={!!loadingToast}
          >
            Add Toast
          </Button>
        </div>
        <div>Selected type autohide duration: {autohideDuration}</div>
        {loadingToast && (
          <Button onClick={handleStopLoading}>Stop Loading</Button>
        )}
        <Toaster {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {};
export const OneToastAtATime: Story = {
  args: {
    maxToasts: 1,
  },
};
