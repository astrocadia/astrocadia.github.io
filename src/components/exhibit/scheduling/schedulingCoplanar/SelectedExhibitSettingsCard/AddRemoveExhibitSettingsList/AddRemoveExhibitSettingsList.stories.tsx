import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../../../../styles/helpers/ThemeProviderWrapper';
import { AddRemoveExhibitSettingsList } from './AddRemoveExhibitSettingsList';
import { FlattenedSettingsBlock } from '../../../../common/utils/settings';

const meta: Meta<typeof AddRemoveExhibitSettingsList> = {
  title:
    'Design System/Composite Components/Exhibit Scheduling/AddRemoveExhibitSettingsList',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: AddRemoveExhibitSettingsList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?node-id=2196-34&m=dev',
    },
  },
  args: {
    settingsManifest: {
      opMode: 'Off',
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
      settingLists: [
        {
          id: 89,
          ExhibitId: 206,
          manifestId: 'test_setting_list',
          listDisplay: 'Test Setting List',
          listParent: null,
          schema: [
            {
              id: 'test_gumband_setting_list_setting',
              display: 'Test SettingList Setting',
              type: 'IntegerInput',
            },
            {
              id: 'test_nested_setting_list',
              type: 'SettingsList',
              display: 'Test Setting List',
              schema: [
                {
                  id: 'test_nested_gumband_setting_list_setting',
                  display: 'Test SettingList Setting',
                  type: 'IntegerInput',
                },
              ],
            },
          ],
          listItemCount: 1,
          order: ['Test Item'],
          orderSelf: 3,
          groupId: null,
          settinglistitems: [
            {
              listName: 'Test Item',
              items: [
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
                {
                  id: 222,
                  ExhibitId: 206,
                  manifestId:
                    'test_setting_list/"Test Item"/test_nested_setting_list',
                  listDisplay: 'Test Setting List',
                  listParent: 89,
                  schema: [
                    {
                      id: 'test_nested_gumband_setting_list_setting',
                      display: 'Test SettingList Setting',
                      type: 'IntegerInput',
                    },
                  ],
                  listItemCount: 1,
                  order: ['test nested item'],
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [
                    {
                      listName: 'test nested item',
                      items: [
                        {
                          id: 4722,
                          manifestId:
                            'test_setting_list/"Test Item"/test_nested_setting_list/"test nested item"/test_nested_gumband_setting_list_setting',
                          exhibitId: 206,
                          type: 'IntegerInput',
                          display: 'Test SettingList Setting',
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
                  ],
                  type: 'SettingsList',
                },
              ],
            },
          ],
          type: 'SettingsList',
        },
      ],
      settingGroups: [
        {
          id: 43,
          ExhibitId: 206,
          manifestId: 'test_setting_group',
          groupDisplay: 'Test Setting Group',
          listId: null,
          groupParent: null,
          schema: [
            {
              id: 'test_gumband_setting_group_setting',
              display: 'Test SettingGroup Setting',
              type: 'IntegerInput',
            },
            {
              id: 'test_gumband_setting_group_setting_2',
              display: 'Test SettingGroup Setting @',
              type: 'Toggle',
            },
            {
              id: 'test_setting_group_nested_setting_list',
              type: 'SettingsList',
              display: 'Test SettingGroup Setting List',
              schema: [
                {
                  id: 'test_nested_gumband_setting_group_setting_list_setting',
                  display: 'Test SettingList Setting',
                  type: 'IntegerInput',
                },
              ],
            },
          ],
          groupItemCount: 0,
          order: 4,
          settings: [
            {
              id: 1994,
              manifestId:
                'test_setting_group/test_gumband_setting_group_setting',
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
          strapiContent: [],
          type: 'SettingsGroup',
          settingGroups: [
            {
              id: 44,
              ExhibitId: 206,
              manifestId: 'test_setting_group/test_nested_setting_group',
              groupDisplay: 'Test Nested Setting Group',
              listId: null,
              groupParent: 43,
              schema: [
                {
                  id: 'test_gumband_nested_setting_group_setting',
                  display: 'Test SettingGroup Setting',
                  type: 'IntegerInput',
                },
              ],
              groupItemCount: 0,
              order: 4,
              settings: [
                {
                  id: 1996,
                  manifestId:
                    'test_setting_group/test_nested_setting_group/test_gumband_nested_setting_group_setting',
                  exhibitId: 206,
                  type: 'IntegerInput',
                  display: 'Test SettingGroup Setting',
                  value: 60,
                  default: '60',
                  order: 1,
                  touchless: null,
                  listId: null,
                  groupId: 44,
                  items: [],
                  read: true,
                  write: true,
                },
              ],
              strapiContent: [],
              type: 'SettingsGroup',
              settingGroups: [],
              settingLists: [],
            },
          ],
          settingLists: [
            {
              id: 90,
              ExhibitId: 206,
              manifestId:
                'test_setting_group/test_setting_group_nested_setting_list',
              listDisplay: 'Test SettingGroup Setting List',
              listParent: null,
              schema: [
                {
                  id: 'test_nested_gumband_setting_group_setting_list_setting',
                  display: 'Test SettingList Setting',
                  type: 'IntegerInput',
                },
              ],
              listItemCount: 1,
              order: ['Test Item'],
              orderSelf: 3,
              groupId: 43,
              settinglistitems: [
                {
                  listName: 'Test Item',
                  items: [
                    {
                      id: 4721,
                      manifestId:
                        'test_setting_group/test_setting_group_nested_setting_list/"Test Item"/test_nested_gumband_setting_group_setting_list_setting',
                      exhibitId: 206,
                      type: 'IntegerInput',
                      display: 'Test SettingList Setting',
                      value: 60,
                      default: '60',
                      order: 1,
                      touchless: null,
                      listId: 90,
                      groupId: null,
                      items: [],
                      read: true,
                      write: true,
                    },
                  ],
                },
              ],
              type: 'SettingsList',
            },
          ],
        },
      ],
      strapiContent: [],
    },
  },
  render: ({ ...props }) => {
    const [opModeChecked, setOpModeChecked] = useState<boolean>(() => false);

    const [selectedSettings, setSelectedSettings] = useState<
      Array<FlattenedSettingsBlock>
    >(() => []);

    return (
      <AddRemoveExhibitSettingsList
        {...props}
        opModeChecked={opModeChecked}
        onOpModeClick={() => setOpModeChecked(!opModeChecked)}
        selectedSettings={selectedSettings}
        onSelectedSettingsChange={setSelectedSettings}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof AddRemoveExhibitSettingsList>;

export const Default: Story = {};

export const WithoutOpMode: Story = {
  args: {
    settingsManifest: {
      opMode: null,
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
      settingLists: [],
      settingGroups: [],
      strapiContent: [],
    },
  },
};
