import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { ToggleExhibitSetting } from './ToggleExhibitSetting';

const meta: Meta<typeof ToggleExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/ToggleExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ToggleExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof ToggleExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.TOGGLE,
      display: 'Toggle input with Write Permissions',
      value: 'true',
      manifestId: 'testToggleinput',
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
      type: SettingTypes.TOGGLE,
      display: 'Toggle input without Write Permissions',
      value: 'true',
      manifestId: 'testToggleinput',
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
