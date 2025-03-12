import MemoryIcon from '@mui/icons-material/Memory';
import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import { HorizontalNavigationMenuButton } from './HorizontalNavigationMenuButton';

const meta: Meta<typeof HorizontalNavigationMenuButton> = {
  title:
    'Design System/Composite Components/Main Panel Navigation/Horizontal Navigation Menu/Horizontal Navigation Menu Button',
  tags: ['autodocs'],
  component: HorizontalNavigationMenuButton,
};

export default meta;
type Story = StoryObj<typeof HorizontalNavigationMenuButton>;

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
          flexDirection: 'row',
          gap: '.5rem',
        }}
      >
        {children}
      </div>
    </RouteWrapper>
  </ThemeProviderWrapper>
);

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <HorizontalNavigationMenuButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected
      />
      <HorizontalNavigationMenuButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected={false}
      />
      <HorizontalNavigationMenuButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected={false}
      />
    </StoryWrapper>
  ),
};
