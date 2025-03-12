import MemoryIcon from '@mui/icons-material/Memory';
import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import { NavigationButton } from './NavigationButton';

const meta: Meta<typeof NavigationButton> = {
  title:
    'Design System/Composite Components/Main Panel Navigation/Standard Navigation Menu/Navigation Button',
  tags: ['autodocs'],
  component: NavigationButton,
};

export default meta;
type Story = StoryObj<typeof NavigationButton>;

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
      <NavigationButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected
      />
      <NavigationButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected={false}
      />
    </StoryWrapper>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <StoryWrapper>
      <NavigationButton
        collapsed
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected
      />
      <NavigationButton
        collapsed
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected={false}
      />
    </StoryWrapper>
  ),
};
