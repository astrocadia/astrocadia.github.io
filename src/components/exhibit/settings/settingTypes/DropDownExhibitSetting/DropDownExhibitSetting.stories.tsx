import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { DropDownExhibitSetting } from './DropDownExhibitSetting';

const meta: Meta<typeof DropDownExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/DropDownExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: DropDownExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof DropDownExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.DROPDOWN,
      display: 'Dropdown with Write Permissions',
      value: 'select_2',
      manifestId: 'testDropdown',
      items: [
        {
          id: 'select_2',
          uniqueId: 1,
          display: 'Option2',
          order: 2,
        },
        {
          id: 'select_1',
          uniqueId: 1,
          display: 'Option 1',
          order: 1,
        },
        {
          id: 'select_3',
          uniqueId: 1,
          display: 'Option 3',
          order: 3,
        },
      ],
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
      type: SettingTypes.DROPDOWN,
      display: 'Dropdown without Write Permissions',
      value: 'select_2',
      manifestId: 'testDropdown',
      items: [
        {
          id: 'select_2',
          uniqueId: 1,
          display: 'Option2',
          order: 2,
        },
        {
          id: 'select_1',
          uniqueId: 1,
          display: 'Option 1',
          order: 1,
        },
        {
          id: 'select_3',
          uniqueId: 1,
          display: 'Option 3',
          order: 3,
        },
      ],
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
