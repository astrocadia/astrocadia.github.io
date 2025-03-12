import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../views/routes/helpers/stories/RouteWrapper';
import { Button } from '../common/buttons';
import { NavigationBlockerDialog } from './NavigationBlockerDialog';

const NavigationButtonWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/home');
  };

  return (
    <>
      <Button onClick={onClick}>Trigger Navigation</Button>
      {children}
    </>
  );
};

const meta: Meta<typeof NavigationBlockerDialog> = {
  title: 'Design System/Composite Components/Navigation Blocker',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <NavigationButtonWrapper>
            <Story />
          </NavigationButtonWrapper>
        </RouteWrapper>
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['audodocs'],
  component: NavigationBlockerDialog,
};

export default meta;
type Story = StoryObj<typeof NavigationBlockerDialog>;

export const Default: Story = {
  args: {
    title: 'Continue Without Saving?',
    blockNavigation: true,
    children:
      'Unsaved changes will be discarded upon exiting this page. Return to Settings if you would like to save your changes.',
  },
};
