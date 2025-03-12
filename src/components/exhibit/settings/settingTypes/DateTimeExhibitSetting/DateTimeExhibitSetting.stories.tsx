import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from '../../../../common/DatePickerCalendar/gumbandDateProvider';
import { DateTimeExhibitSetting } from './DateTimeExhibitSetting';

const meta: Meta<typeof DateTimeExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/DateTimeExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <GumbandDateProvider>
          <Story />
        </GumbandDateProvider>
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: DateTimeExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof DateTimeExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.DATE,
      display: 'Current Date with Write Permissions',
      value: DateTime.now().toISO(),
      manifestId: 'testDateInput',
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
      type: SettingTypes.DATE,
      display: 'Current Date without Write Permissions',
      value: DateTime.now().toISO(),
      manifestId: 'testDateInput',
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

export const EmptyWithWritePermissions: Story = {
  args: {
    setting: {
      type: SettingTypes.DATE,
      display: 'Empty Date with Write Permissions',
      value: '',
      manifestId: 'testDateInput',
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

export const EmptyWithoutWritePermission: Story = {
  args: {
    setting: {
      type: SettingTypes.DATE,
      display: 'Empty Date without Write Permissions',
      value: '',
      manifestId: 'testDateInput',
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
