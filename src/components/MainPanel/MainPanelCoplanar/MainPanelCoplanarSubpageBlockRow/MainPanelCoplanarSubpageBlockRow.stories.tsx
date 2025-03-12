import type { Meta, Parameters, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { TextField } from '../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from './MainPanelCoplanarSubpageBlockRow';

const meta: Meta<typeof MainPanelCoplanarSubpageBlockRow> = {
  title:
    'Design System/Composite Components/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: MainPanelCoplanarSubpageBlockRow,
  args: {
    children: (
      <TextField
        orientation='horizontal'
        style={{ width: '100%' }}
        label='MainPanelCoplanarSubpageBlockRow'
      />
    ),
    // Since Storybook will add its own onClick handler, we need to set it to undefined
    onClick: undefined,
  },
};

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?m=auto&node-id=876-25985&t=Yq1GAbmbn7z87WOc-1',
  },
};

export default meta;
type Story = StoryObj<typeof MainPanelCoplanarSubpageBlockRow>;

export const Default: Story = { parameters };

export const Clickable: Story = {
  args: {
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert('Clicked!');
    },
  },
  parameters,
};

export const Siblings: Story = {
  render: (props) => {
    return (
      <>
        <MainPanelCoplanarSubpageBlockRow {...props} />
        <MainPanelCoplanarSubpageBlockRow {...props} />
        <MainPanelCoplanarSubpageBlockRow {...props} />
      </>
    );
  },
  parameters,
};
