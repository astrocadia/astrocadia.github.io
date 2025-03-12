import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import { NavigationBackButton } from './NavigationBackButton';

const meta: Meta<typeof NavigationBackButton> = {
  title:
    'Design System/Composite Components/Main Panel Navigation/Standard Navigation Menu/Navigation Back Button',
  tags: ['autodocs'],
  component: NavigationBackButton,
};

export default meta;
type Story = StoryObj<typeof NavigationBackButton>;

const StoryWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <ThemeProviderWrapper>
    <RouteWrapper>
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
      >
        {children}
      </div>
    </RouteWrapper>
  </ThemeProviderWrapper>
);

export const Expanded: Story = {
  render: () => (
    <StoryWrapper>
      <NavigationBackButton workspaceId={1} />
      <NavigationBackButton projectId={1} />
    </StoryWrapper>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <StoryWrapper>
      <NavigationBackButton collapsed workspaceId={1} />
      <NavigationBackButton collapsed projectId={1} />
    </StoryWrapper>
  ),
};
