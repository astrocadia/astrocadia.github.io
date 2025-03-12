import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { useMemo } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ErrorFeedbackPanel } from './ErrorFeedbackPanel';
import { store } from '../../../app/store';
import { Button } from '../../common/buttons';
import { MainPanel } from '../../MainPanel';
import { ExhibitComponentIcon } from '../../common/icons';

const meta: Meta<typeof ErrorFeedbackPanel> = {
  title: 'Design System/Composite Components/ErrorFeedbackPanel',
  tags: ['autodocs'],
  component: ErrorFeedbackPanel,
};

export default meta;
type Story = StoryObj<typeof ErrorFeedbackPanel>;

export const Default: Story = {
  render: () => {
    const text = useMemo(
      () => ({
        title: 'Error Feedback Panel',
        message:
          'This is an error panel that is inside of a `MainPanel` component. Currently you can pass an action to it that supplies the first button and the second action (Contact Support) is baked in. We can add more actions as needed or make action two a prop later.',
      }),
      []
    );

    const action = useMemo(
      () => (
        <Button
          startIcon={<ExhibitComponentIcon />}
          // eslint-disable-next-line no-alert
          onClick={() => alert('Action button clicked')}
        >
          Action
        </Button>
      ),
      []
    );

    return (
      <ThemeProviderWrapper>
        <Provider store={store}>
          <MainPanel>
            <ErrorFeedbackPanel
              title={text.title}
              message={text.message}
              action={action}
            />
          </MainPanel>
        </Provider>
      </ThemeProviderWrapper>
    );
  },
};
