import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { MainPanelCoplanarSubpageBlockCheckbox } from './MainPanelCoplanarSubpageBlockCheckbox';

const meta: Meta<typeof MainPanelCoplanarSubpageBlockCheckbox> = {
  title:
    'Design System/Composite Components/MainPanelCoplanar/MainPanelCoplanarSubpageBlockCheckbox',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: MainPanelCoplanarSubpageBlockCheckbox,
  args: {
    title: 'MainPanelCoplanarSubpageBlockCheckbox',
    // Since Storybook will add its own onClick handler, we need to set it to undefined
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?m=auto&node-id=876-25985&t=Yq1GAbmbn7z87WOc-1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainPanelCoplanarSubpageBlockCheckbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <MainPanelCoplanarSubpageBlockCheckbox
        title='MainPanelCoplanarSubpageBlockCheckbox'
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
    );
  },
};
export const WithDescription: Story = {
  args: {
    subtitle: 'Example Description',
  },
};
export const LongTitle: Story = {
  args: {
    title:
      'Checkbox Title with a long title that will cause the text to wrap onto multiple lines if I do it right. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra ante id tellus commodo dapibus. Nam eu pretium lorem, luctus venenatis orci.',
  },
};

export const Siblings: Story = {
  render: (props) => {
    return (
      <>
        <MainPanelCoplanarSubpageBlockCheckbox {...props} />
        <MainPanelCoplanarSubpageBlockCheckbox checked {...props} />
        <MainPanelCoplanarSubpageBlockCheckbox disabled {...props} />
        <MainPanelCoplanarSubpageBlockCheckbox checked disabled {...props} />
      </>
    );
  },
};
