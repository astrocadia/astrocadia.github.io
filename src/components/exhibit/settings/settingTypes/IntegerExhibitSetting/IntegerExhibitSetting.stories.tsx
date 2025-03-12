import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { IntegerExhibitSetting } from './IntegerExhibitSetting';

const meta: Meta<typeof IntegerExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/IntegerExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: IntegerExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof IntegerExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.INTEGER_INPUT,
      display: 'Int Input with Write Permissions',
      value: 100,
      manifestId: 'testIntInput',
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

export const Unwritable: Story = {
  args: {
    setting: {
      type: SettingTypes.INTEGER_INPUT,
      display: 'Int Input without Write Permissions',
      value: 100,
      manifestId: 'testIntInput',
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
