import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { HexColorExhibitSetting } from './HexColorExhibitSetting';

const meta: Meta<typeof HexColorExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/HexColorExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: HexColorExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof HexColorExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.HEX_COLOR,
      display: 'Hex Color with Write Permissions',
      value: 'Starting Value',
      manifestId: 'testHexColor',
      items: [],
      exhibitId: 1,
      id: 1,
      read: true,
      write: true,
      default: null,
      order: null,
      touchless: null,
      listId: null,
      groupId: null,
    },
  },
};

export const Disabled: Story = {
  args: {
    setting: Default.args?.setting,
    disabled: true,
  },
};

export const Unwriteable: Story = {
  args: {
    setting: {
      type: SettingTypes.HEX_COLOR,
      display: 'Hex Color without Write Permissions',
      value: 'Starting Value',
      manifestId: 'testHexColor',
      items: [],
      exhibitId: 1,
      id: 1,
      read: true,
      write: false,
      default: null,
      order: null,
      touchless: null,
      listId: null,
      groupId: null,
    },
  },
};
