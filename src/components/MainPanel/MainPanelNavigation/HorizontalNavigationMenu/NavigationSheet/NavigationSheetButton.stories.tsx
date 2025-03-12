import MemoryIcon from '@mui/icons-material/Memory';
import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../../views/routes/helpers/stories/RouteWrapper';
import { NavigationSheetButton } from './NavigationSheetButton';

const meta: Meta<typeof NavigationSheetButton> = {
  title:
    'Design System/Composite Components/Main Panel Navigation/Horizontal Navigation Menu/Navigation Sheet/Navigation Sheet Button',
  tags: ['autodocs'],
  component: NavigationSheetButton,
};

export default meta;
type Story = StoryObj<typeof NavigationSheetButton>;

const StoryWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <ThemeProviderWrapper>
    <RouteWrapper>
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
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
      <NavigationSheetButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected
      />
      <NavigationSheetButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected={false}
      />
      <NavigationSheetButton
        Icon={<MemoryIcon />}
        label='Label'
        // eslint-disable-next-line no-console
        onClick={() => console.log('clicked')}
        selected={false}
      />
    </StoryWrapper>
  ),
};
