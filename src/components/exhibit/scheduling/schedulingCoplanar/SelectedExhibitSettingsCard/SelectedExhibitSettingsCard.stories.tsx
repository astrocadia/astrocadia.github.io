import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { SelectedExhibitSettingsCard } from './SelectedExhibitSettingsCard';

const meta: Meta<typeof SelectedExhibitSettingsCard> = {
  title:
    'Design System/Composite Components/Exhibit Scheduling/SelectedExhibitSettingsCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: SelectedExhibitSettingsCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev',
    },
  },
  args: {
    opMode: 'Off',
    selectedExhibitSettings: [
      {
        breadcrumbs: [],
        settings: [
          {
            id: 1997,
            manifestId: 'test_gumband_setting',
            exhibitId: 206,
            type: 'Dropdown',
            display: 'Test Gumband Setting',
            value: '3',
            default: '1',
            order: 1,
            touchless: null,
            listId: null,
            groupId: null,
            items: [
              {
                id: '1',
                uniqueId: 2159,
                display: '01',
                order: null,
              },
              {
                id: '2',
                uniqueId: 2160,
                display: '02',
                order: null,
              },
              {
                id: '3',
                uniqueId: 2161,
                display: '03',
                order: null,
              },
            ],
            read: true,
            write: true,
          },
        ],
      },
      {
        breadcrumbs: [
          {
            manifestId: 'test_setting_list',
            label: 'Test Setting List',
          },
          {
            manifestId: 'test_setting_list/"Test Item"',
            label: 'Test Item',
            isSettingListItem: true,
          },
        ],
        settings: [
          {
            id: 4720,
            manifestId:
              'test_setting_list/"Test Item"/test_gumband_setting_list_setting',
            exhibitId: 206,
            type: 'IntegerInput',
            display: 'Test SettingList Setting',

            value: 60,
            default: '60',
            order: 1,
            touchless: null,
            listId: 89,
            groupId: null,
            items: [],
            read: true,
            write: true,
          },
        ],
      },
      {
        breadcrumbs: [
          {
            manifestId: 'test_setting_list',
            label: 'Test Setting List',
          },
          {
            manifestId: 'test_setting_list/"Test Item"',
            label: 'Test Item',
            isSettingListItem: true,
          },
          {
            manifestId:
              'test_setting_list/"Test Item"/test_nested_setting_list',
            label: 'Nest Setting List',
          },
          {
            manifestId:
              'test_setting_list/"Test Item"/test_nested_setting_list/"Test Nested Item"',
            label: 'Test Nested Item',
            isSettingListItem: true,
          },
        ],
        settings: [
          {
            id: 4722,
            manifestId:
              'test_setting_list/"Test Item"/test_nested_setting_list/"Test Nested Item"/test_nested_gumband_setting_list_setting',
            exhibitId: 206,
            type: 'IntegerInput',
            display: 'Test Nested SettingList Setting',
            value: 60,
            default: '60',
            order: 1,
            touchless: null,
            listId: 222,
            groupId: null,
            items: [],
            read: true,
            write: true,
          },
        ],
      },
      {
        breadcrumbs: [
          {
            manifestId: 'test_setting_group',
            label: 'Test Setting Group',
          },
        ],
        settings: [
          {
            id: 1994,
            manifestId: 'test_setting_group/test_gumband_setting_group_setting',
            exhibitId: 206,
            type: 'IntegerInput',
            display: 'Test SettingGroup Setting',
            value: 64,
            default: '60',
            order: 1,
            touchless: null,
            listId: null,
            groupId: 43,
            items: [],
            read: true,
            write: true,
          },
          {
            id: 2016,
            manifestId:
              'test_setting_group/test_gumband_setting_group_setting_2',
            exhibitId: 206,
            type: 'Toggle',
            display: 'Test SettingGroup Setting 2',
            value: 'true',
            default: 'true',
            order: 1,
            touchless: null,
            listId: null,
            groupId: 43,
            items: [],
            read: true,
            write: true,
          },
        ],
      },
    ],
    onButtonClick: () => {
      // eslint-disable-next-line no-alert
      alert('Button clicked');
    },
    onOpModeChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SelectedExhibitSettingsCard>;

export const Default: Story = {};
export const WithoutOpMode: Story = {
  args: {
    opMode: undefined,
    selectedExhibitSettings: [
      {
        breadcrumbs: [],
        settings: [
          {
            id: 1997,
            manifestId: 'test_gumband_setting',
            exhibitId: 206,
            type: 'Dropdown',
            display: 'Test Gumband Setting',
            value: '3',
            default: '1',
            order: 1,
            touchless: null,
            listId: null,
            groupId: null,
            items: [
              {
                id: '1',
                uniqueId: 2159,
                display: '01',
                order: null,
              },
              {
                id: '2',
                uniqueId: 2160,
                display: '02',
                order: null,
              },
              {
                id: '3',
                uniqueId: 2161,
                display: '03',
                order: null,
              },
            ],
            read: true,
            write: true,
          },
        ],
      },
      {
        breadcrumbs: [
          {
            manifestId: 'test_setting_list',
            label: 'Test Setting List',
          },
          {
            manifestId: 'test_setting_list/"Test Item"',
            label: 'Test Item',
            isSettingListItem: true,
          },
        ],
        settings: [
          {
            id: 4720,
            manifestId:
              'test_setting_list/"Test Item"/test_gumband_setting_list_setting',
            exhibitId: 206,
            type: 'IntegerInput',
            display: 'Test SettingList Setting',

            value: 60,
            default: '60',
            order: 1,
            touchless: null,
            listId: 89,
            groupId: null,
            items: [],
            read: true,
            write: true,
          },
        ],
      },
      {
        breadcrumbs: [
          {
            manifestId: 'test_setting_list',
            label: 'Test Setting List',
          },
          {
            manifestId: 'test_setting_list/"Test Item"',
            label: 'Test Item',
            isSettingListItem: true,
          },
          {
            manifestId:
              'test_setting_list/"Test Item"/test_nested_setting_list',
            label: 'Nest Setting List',
          },
          {
            manifestId:
              'test_setting_list/"Test Item"/test_nested_setting_list/"Test Nested Item"',
            label: 'Test Nested Item',
            isSettingListItem: true,
          },
        ],
        settings: [
          {
            id: 4722,
            manifestId:
              'test_setting_list/"Test Item"/test_nested_setting_list/"Test Nested Item"/test_nested_gumband_setting_list_setting',
            exhibitId: 206,
            type: 'IntegerInput',
            display: 'Test Nested SettingList Setting',
            value: 60,
            default: '60',
            order: 1,
            touchless: null,
            listId: 222,
            groupId: null,
            items: [],
            read: true,
            write: true,
          },
        ],
      },
      {
        breadcrumbs: [
          {
            manifestId: 'test_setting_group',
            label: 'Test Setting Group',
          },
        ],
        settings: [
          {
            id: 1994,
            manifestId: 'test_setting_group/test_gumband_setting_group_setting',
            exhibitId: 206,
            type: 'IntegerInput',
            display: 'Test SettingGroup Setting',
            value: 64,
            default: '60',
            order: 1,
            touchless: null,
            listId: null,
            groupId: 43,
            items: [],
            read: true,
            write: true,
          },
          {
            id: 2016,
            manifestId:
              'test_setting_group/test_gumband_setting_group_setting_2',
            exhibitId: 206,
            type: 'Toggle',
            display: 'Test SettingGroup Setting 2',
            value: 'true',
            default: 'true',
            order: 1,
            touchless: null,
            listId: null,
            groupId: 43,
            items: [],
            read: true,
            write: true,
          },
        ],
      },
    ],
    onButtonClick: () => {
      // eslint-disable-next-line no-alert
      alert('Button clicked');
    },
    onOpModeChange: () => {},
  },
};
