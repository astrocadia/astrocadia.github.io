import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { ExhibitComponentAuthInfoDialog } from './ExhibitComponentAuthInfoDialog';
import { Button } from '../../../common/buttons';
import { EXHIBIT_COMPONENT_TYPE } from '../../../../app/entities/exhibitComponents';

const meta: Meta<typeof ExhibitComponentAuthInfoDialog> = {
  title: 'Design System/Composite Components/ExhibitComponentAuthInfoDialog',
  tags: ['autodocs'],
  component: ExhibitComponentAuthInfoDialog,
  args: {
    componentType: EXHIBIT_COMPONENT_TYPE.CUSTOM_HARDWARE,
    componentId: '1234',
    token: '1234-5678-9012-3456',
  },
};

export default meta;
type Story = StoryObj<typeof ExhibitComponentAuthInfoDialog>;

export const Default: Story = {
  render: (props) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <ThemeProviderWrapper>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <ExhibitComponentAuthInfoDialog
          {...props}
          open={open}
          onClose={handleClose}
        />
      </ThemeProviderWrapper>
    );
  },
};
