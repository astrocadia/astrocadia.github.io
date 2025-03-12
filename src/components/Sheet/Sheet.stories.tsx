import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, useCallback, useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { Button } from '../common/buttons';
import { useToggle } from '../common/hooks/useToggle';
import { Sheet, SheetProps } from './Sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Design System/Composite Components/Sheet',
  tags: ['autodocs'],
  component: Sheet,
};

export default meta;
type Story = StoryObj<typeof Sheet>;

const DefaultComponent: FunctionComponent = () => {
  const [anchor, setAnchor] = useState<SheetProps['anchor']>('bottom');
  const { toggled: open, setOn: onOpen, setOff: onClose } = useToggle(false);

  const handleOnClick = useCallback(
    (newAnchor: SheetProps['anchor']) => {
      setAnchor(newAnchor);
      onOpen();
    },
    [onOpen]
  );

  return (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button onClick={() => handleOnClick('bottom')}>
          Open Bottom Sheet
        </Button>
        <Button onClick={() => handleOnClick('top')}>Open Top Sheet</Button>
        <Button onClick={() => handleOnClick('left')}>Open Left Sheet</Button>
        <Button onClick={() => handleOnClick('right')}>Open Right Sheet</Button>
      </div>
      <Sheet anchor={anchor} open={open} onClose={onClose}>
        <div
          style={{
            border: 'dashed 2px red',
            textAlign: 'center',
            padding: '0.5rem',
            height: anchor === 'left' || anchor === 'right' ? '100%' : 'auto',
          }}
        >
          Content
        </div>
      </Sheet>
    </ThemeProviderWrapper>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};
