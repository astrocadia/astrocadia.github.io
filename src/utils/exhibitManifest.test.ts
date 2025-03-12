import { beforeEach, describe, expect, it } from 'vitest';
import {
  STATUS_TYPE,
  type ExhibitManifest,
  type IndividualSetting,
  type SettingGroup,
  type SettingList,
} from '../app/entities/exhibitManifest';
import { findSetting } from './exhibitManifest';

describe('Utils - manifest', () => {
  let setting: IndividualSetting;
  let nestedSetting: IndividualSetting;
  let nestedSettingListInGroup: SettingList;
  let settingGroup: SettingGroup;
  let nestedSettingListInList: SettingList;
  let manifest: ExhibitManifest;

  beforeEach(() => {
    setting = {
      id: 6,
      manifestId: 'prod_api',
      exhibitId: 8,
      type: 'Toggle',
      display: 'Production API',
      value: 'true',
      default: '',
      order: null,
      touchless: true,
      listId: null,
      groupId: null,
      items: [],
      read: true,
      write: true,
    };

    nestedSetting = {
      id: 19,
      manifestId:
        'ancestor_list/"First ancestor"/parentA_list/"Parent A1"/child_A_1/"Child A1 2"/child_A_1_input',
      exhibitId: 8,
      type: 'TextInput',
      display: 'Child A 1 Input',
      value: 'Bar',
      default: null,
      order: null,
      touchless: null,
      listId: 13,
      groupId: null,
      items: [],
      read: true,
      write: true,
    };

    nestedSettingListInGroup = {
      id: 2,
      ExhibitId: 8,
      manifestId: 'grouped_named_images/images_list',
      listDisplay: 'Images',
      listParent: null,
      schema: [
        {
          type: 'FileSelection',
          id: 'image_file',
          display: 'Image',
        },
      ],
      listItemCount: 0,
      order: null,
      orderSelf: null,
      groupId: 1,
      settinglistitems: [],
      type: 'SettingsList',
    };

    settingGroup = {
      id: 1,
      ExhibitId: 8,
      manifestId: 'grouped_named_images',
      groupDisplay: 'Grouped Named Images',
      listId: null,
      groupParent: null,
      schema: [
        {
          type: 'TextInput',
          id: 'image_group_title',
          display: 'Image Group Title',
        },
        {
          type: 'SettingsList',
          id: 'images_list',
          display: 'Images',
          schema: [
            {
              type: 'FileSelection',
              id: 'image_file',
              display: 'Image',
            },
          ],
        },
      ],
      groupItemCount: 0,
      order: null,
      settings: [
        {
          id: 4,
          manifestId: 'grouped_named_images/image_group_title',
          exhibitId: 8,
          type: 'TextInput',
          display: 'Image Group Title',
          value: 'dddsdfg',
          default: null,
          order: null,
          touchless: null,
          listId: null,
          groupId: 1,
          items: [],
          read: true,
          write: true,
        },
      ],
      strapiContent: [],
      type: 'SettingsGroup',
      settingGroups: [],
      settingLists: [nestedSettingListInGroup],
    };

    nestedSettingListInList = {
      id: 14,
      ExhibitId: 8,
      manifestId:
        'ancestor_list/"First ancestor"/parentA_list/"Parent A1"/child_A_2',
      listDisplay: 'Child A 2',
      listParent: 10,
      schema: [
        {
          type: 'TextInput',
          id: 'child_A_2_input',
          display: 'Child A 2 Input',
        },
      ],
      listItemCount: 0,
      order: null,
      orderSelf: null,
      groupId: null,
      settinglistitems: [],
      type: 'SettingsList',
    };

    manifest = {
      id: 8,
      siteId: 2,
      name: 'Full example',
      mqttPath: null,
      online: false,
      manifestLocked: false,
      opMode: 'On',
      settingLists: [
        {
          id: 1,
          ExhibitId: 8,
          manifestId: 'named_images',
          listDisplay: 'Named Images',
          listParent: null,
          schema: [
            {
              type: 'TextInput',
              id: 'image_group_title',
              display: 'Image Group Title',
            },
            {
              type: 'SettingsList',
              id: 'images_list',
              display: 'Images',
              schema: [
                {
                  type: 'FileSelection',
                  id: 'image_file',
                  display: 'Image',
                },
              ],
            },
          ],
          listItemCount: 2,
          order: ['named image 1', 'sdfg'],
          orderSelf: null,
          groupId: null,
          settinglistitems: [
            {
              listName: 'named image 1',
              items: [
                {
                  id: 12,
                  manifestId: 'named_images/"named image 1"/image_group_title',
                  exhibitId: 8,
                  type: 'TextInput',
                  display: 'Image Group Title',
                  value: 'sdfg',
                  default: '',
                  order: null,
                  touchless: null,
                  listId: 1,
                  groupId: null,
                  items: [],
                  read: true,
                  write: true,
                },
                {
                  id: 4,
                  ExhibitId: 8,
                  manifestId: 'named_images/"named image 1"/images_list',
                  listDisplay: 'Images',
                  listParent: 1,
                  schema: [
                    {
                      type: 'FileSelection',
                      id: 'image_file',
                      display: 'Image',
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
              ],
            },
            {
              listName: 'sdfg',
              items: [
                {
                  id: 14,
                  manifestId: 'named_images/"sdfg"/image_group_title',
                  exhibitId: 8,
                  type: 'TextInput',
                  display: 'Image Group Title',
                  value: 'sdfgsdfgsdfdfgsdfg',
                  default: '',
                  order: null,
                  touchless: null,
                  listId: 1,
                  groupId: null,
                  items: [],
                  read: true,
                  write: true,
                },
                {
                  id: 6,
                  ExhibitId: 8,
                  manifestId: 'named_images/"sdfg"/images_list',
                  listDisplay: 'Images',
                  listParent: 1,
                  schema: [
                    {
                      type: 'FileSelection',
                      id: 'image_file',
                      display: 'Image',
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
              ],
            },
          ],
          type: 'SettingsList',
        },
        {
          id: 9,
          ExhibitId: 8,
          manifestId: 'ancestor_list',
          listDisplay: 'Ancestor List Settings',
          listParent: null,
          schema: [
            {
              type: 'SettingsList',
              id: 'parentA_list',
              display: 'Parent A',
              schema: [
                {
                  type: 'SettingsList',
                  id: 'child_A_1',
                  display: 'Child A 1',
                  schema: [
                    {
                      type: 'TextInput',
                      id: 'child_A_1_input',
                      display: 'Child A 1 Input',
                    },
                  ],
                },
                {
                  type: 'SettingsList',
                  id: 'child_A_2',
                  display: 'Child A 2',
                  schema: [
                    {
                      type: 'TextInput',
                      id: 'child_A_2_input',
                      display: 'Child A 2 Input',
                    },
                  ],
                },
              ],
            },
            {
              type: 'SettingsList',
              id: 'parentB_list',
              display: 'Parent B',
              schema: [
                {
                  type: 'SettingsList',
                  id: 'child_B_1',
                  display: 'Child B 1',
                  schema: [
                    {
                      type: 'TextInput',
                      id: 'child_B_1_input',
                      display: 'Child B 1 Input',
                    },
                  ],
                },
                {
                  type: 'SettingsList',
                  id: 'child_B_2',
                  display: 'Child B 2',
                  schema: [
                    {
                      type: 'TextInput',
                      id: 'child_B_2_input',
                      display: 'Child B 2 Input',
                    },
                  ],
                },
              ],
            },
            {
              type: 'SettingsList',
              id: 'images_list',
              display: 'Images',
              schema: [
                {
                  type: 'FileSelection',
                  id: 'image_file',
                  display: 'Image',
                },
              ],
            },
          ],
          listItemCount: 3,
          order: ['First ancestor', 'Second Ancestor', 'ddfghdfg'],
          orderSelf: null,
          groupId: null,
          settinglistitems: [
            {
              listName: 'First ancestor',
              items: [
                {
                  id: 11,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"First ancestor"/parentB_list',
                  listDisplay: 'Parent B',
                  listParent: 9,
                  schema: [
                    {
                      type: 'SettingsList',
                      id: 'child_B_1',
                      display: 'Child B 1',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_B_1_input',
                          display: 'Child B 1 Input',
                        },
                      ],
                    },
                    {
                      type: 'SettingsList',
                      id: 'child_B_2',
                      display: 'Child B 2',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_B_2_input',
                          display: 'Child B 2 Input',
                        },
                      ],
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
                {
                  id: 12,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"First ancestor"/images_list',
                  listDisplay: 'Images',
                  listParent: 9,
                  schema: [
                    {
                      type: 'FileSelection',
                      id: 'image_file',
                      display: 'Image',
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
                {
                  id: 10,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"First ancestor"/parentA_list',
                  listDisplay: 'Parent A',
                  listParent: 9,
                  schema: [
                    {
                      type: 'SettingsList',
                      id: 'child_A_1',
                      display: 'Child A 1',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_A_1_input',
                          display: 'Child A 1 Input',
                        },
                      ],
                    },
                    {
                      type: 'SettingsList',
                      id: 'child_A_2',
                      display: 'Child A 2',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_A_2_input',
                          display: 'Child A 2 Input',
                        },
                      ],
                    },
                  ],
                  listItemCount: 3,
                  order: ['Parent A1', 'Parent A2', 'Parent A3'],
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [
                    {
                      listName: 'Parent A1',
                      items: [
                        nestedSettingListInList,
                        {
                          id: 13,
                          ExhibitId: 8,
                          manifestId:
                            'ancestor_list/"First ancestor"/parentA_list/"Parent A1"/child_A_1',
                          listDisplay: 'Child A 1',
                          listParent: 10,
                          schema: [
                            {
                              type: 'TextInput',
                              id: 'child_A_1_input',
                              display: 'Child A 1 Input',
                            },
                          ],
                          listItemCount: 3,
                          order: ['Child A1 2', 'baz', 'dfgsdfg'],
                          orderSelf: null,
                          groupId: null,
                          settinglistitems: [
                            {
                              listName: 'Child A1 2',
                              items: [nestedSetting],
                            },
                            {
                              listName: 'baz',
                              items: [
                                {
                                  id: 20,
                                  manifestId:
                                    'ancestor_list/"First ancestor"/parentA_list/"Parent A1"/child_A_1/"baz"/child_A_1_input',
                                  exhibitId: 8,
                                  type: 'TextInput',
                                  display: 'Child A 1 Input',
                                  value: null,
                                  default: null,
                                  order: null,
                                  touchless: null,
                                  listId: 13,
                                  groupId: null,
                                  items: [],
                                  read: true,
                                  write: true,
                                },
                              ],
                            },
                            {
                              listName: 'dfgsdfg',
                              items: [
                                {
                                  id: 21,
                                  manifestId:
                                    'ancestor_list/"First ancestor"/parentA_list/"Parent A1"/child_A_1/"dfgsdfg"/child_A_1_input',
                                  exhibitId: 8,
                                  type: 'TextInput',
                                  display: 'Child A 1 Input',
                                  value: null,
                                  default: null,
                                  order: null,
                                  touchless: null,
                                  listId: 13,
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
                    {
                      listName: 'Parent A2',
                      items: [
                        {
                          id: 15,
                          ExhibitId: 8,
                          manifestId:
                            'ancestor_list/"First ancestor"/parentA_list/"Parent A2"/child_A_1',
                          listDisplay: 'Child A 1',
                          listParent: 10,
                          schema: [
                            {
                              type: 'TextInput',
                              id: 'child_A_1_input',
                              display: 'Child A 1 Input',
                            },
                          ],
                          listItemCount: 0,
                          order: null,
                          orderSelf: null,
                          groupId: null,
                          settinglistitems: [],
                          type: 'SettingsList',
                        },
                        {
                          id: 16,
                          ExhibitId: 8,
                          manifestId:
                            'ancestor_list/"First ancestor"/parentA_list/"Parent A2"/child_A_2',
                          listDisplay: 'Child A 2',
                          listParent: 10,
                          schema: [
                            {
                              type: 'TextInput',
                              id: 'child_A_2_input',
                              display: 'Child A 2 Input',
                            },
                          ],
                          listItemCount: 0,
                          order: null,
                          orderSelf: null,
                          groupId: null,
                          settinglistitems: [],
                          type: 'SettingsList',
                        },
                      ],
                    },
                    {
                      listName: 'Parent A3',
                      items: [
                        {
                          id: 17,
                          ExhibitId: 8,
                          manifestId:
                            'ancestor_list/"First ancestor"/parentA_list/"Parent A3"/child_A_1',
                          listDisplay: 'Child A 1',
                          listParent: 10,
                          schema: [
                            {
                              type: 'TextInput',
                              id: 'child_A_1_input',
                              display: 'Child A 1 Input',
                            },
                          ],
                          listItemCount: 0,
                          order: null,
                          orderSelf: null,
                          groupId: null,
                          settinglistitems: [],
                          type: 'SettingsList',
                        },
                        {
                          id: 18,
                          ExhibitId: 8,
                          manifestId:
                            'ancestor_list/"First ancestor"/parentA_list/"Parent A3"/child_A_2',
                          listDisplay: 'Child A 2',
                          listParent: 10,
                          schema: [
                            {
                              type: 'TextInput',
                              id: 'child_A_2_input',
                              display: 'Child A 2 Input',
                            },
                          ],
                          listItemCount: 0,
                          order: null,
                          orderSelf: null,
                          groupId: null,
                          settinglistitems: [],
                          type: 'SettingsList',
                        },
                      ],
                    },
                  ],
                  type: 'SettingsList',
                },
              ],
            },
            {
              listName: 'Second Ancestor',
              items: [
                {
                  id: 22,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"Second Ancestor"/parentA_list',
                  listDisplay: 'Parent A',
                  listParent: 9,
                  schema: [
                    {
                      type: 'SettingsList',
                      id: 'child_A_1',
                      display: 'Child A 1',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_A_1_input',
                          display: 'Child A 1 Input',
                        },
                      ],
                    },
                    {
                      type: 'SettingsList',
                      id: 'child_A_2',
                      display: 'Child A 2',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_A_2_input',
                          display: 'Child A 2 Input',
                        },
                      ],
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
                {
                  id: 23,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"Second Ancestor"/parentB_list',
                  listDisplay: 'Parent B',
                  listParent: 9,
                  schema: [
                    {
                      type: 'SettingsList',
                      id: 'child_B_1',
                      display: 'Child B 1',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_B_1_input',
                          display: 'Child B 1 Input',
                        },
                      ],
                    },
                    {
                      type: 'SettingsList',
                      id: 'child_B_2',
                      display: 'Child B 2',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_B_2_input',
                          display: 'Child B 2 Input',
                        },
                      ],
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
                {
                  id: 24,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"Second Ancestor"/images_list',
                  listDisplay: 'Images',
                  listParent: 9,
                  schema: [
                    {
                      type: 'FileSelection',
                      id: 'image_file',
                      display: 'Image',
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
              ],
            },
            {
              listName: 'ddfghdfg',
              items: [
                {
                  id: 28,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"ddfghdfg"/parentA_list',
                  listDisplay: 'Parent A',
                  listParent: 9,
                  schema: [
                    {
                      type: 'SettingsList',
                      id: 'child_A_1',
                      display: 'Child A 1',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_A_1_input',
                          display: 'Child A 1 Input',
                        },
                      ],
                    },
                    {
                      type: 'SettingsList',
                      id: 'child_A_2',
                      display: 'Child A 2',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_A_2_input',
                          display: 'Child A 2 Input',
                        },
                      ],
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
                {
                  id: 29,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"ddfghdfg"/parentB_list',
                  listDisplay: 'Parent B',
                  listParent: 9,
                  schema: [
                    {
                      type: 'SettingsList',
                      id: 'child_B_1',
                      display: 'Child B 1',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_B_1_input',
                          display: 'Child B 1 Input',
                        },
                      ],
                    },
                    {
                      type: 'SettingsList',
                      id: 'child_B_2',
                      display: 'Child B 2',
                      schema: [
                        {
                          type: 'TextInput',
                          id: 'child_B_2_input',
                          display: 'Child B 2 Input',
                        },
                      ],
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
                {
                  id: 30,
                  ExhibitId: 8,
                  manifestId: 'ancestor_list/"ddfghdfg"/images_list',
                  listDisplay: 'Images',
                  listParent: 9,
                  schema: [
                    {
                      type: 'FileSelection',
                      id: 'image_file',
                      display: 'Image',
                    },
                  ],
                  listItemCount: 0,
                  order: null,
                  orderSelf: null,
                  groupId: null,
                  settinglistitems: [],
                  type: 'SettingsList',
                },
              ],
            },
          ],
          type: 'SettingsList',
        },
      ],
      settingGroups: [settingGroup],
      settings: [
        {
          id: 5,
          manifestId: 'kiosk_name',
          exhibitId: 8,
          type: 'TextInput',
          display: 'Kiosk Name',
          value: '(not set)',
          default: '(not set)',
          order: null,
          touchless: true,
          listId: null,
          groupId: null,
          items: [],
          read: true,
          write: true,
        },
        {
          id: 9,
          manifestId: 'ux_mode',
          exhibitId: 8,
          type: 'SingleButtonGroup',
          display: 'UX Mode',
          value: 'ux_mode_ambient',
          default: 'ux_mode_ambient',
          order: null,
          touchless: true,
          listId: null,
          groupId: null,
          items: [
            {
              id: 'ux_mode_silent',
              uniqueId: 12,
              display: 'Silent',
              order: null,
            },
            {
              id: 'ux_mode_ambient',
              uniqueId: 14,
              display: 'Ambient',
              order: null,
            },
            {
              id: 'ux_mode_offline',
              uniqueId: 17,
              display: 'Offline',
              order: null,
            },
          ],
          read: true,
          write: true,
        },
        {
          id: 10,
          manifestId: 'date',
          exhibitId: 8,
          type: 'Date',
          display: 'Date',
          value: 'Wed Jan 17 2024 08:00:00 GMT-0500 (Eastern Standard Time)',
          default: '',
          order: null,
          touchless: true,
          listId: null,
          groupId: null,
          items: [],
          read: true,
          write: true,
        },
        {
          id: 16,
          manifestId: 'location',
          exhibitId: 8,
          type: 'Dropdown',
          display: 'Location',
          value: 'location_newyork',
          default: 'location_seoul',
          order: null,
          touchless: true,
          listId: null,
          groupId: null,
          items: [
            {
              id: 'location_saopaulo',
              uniqueId: 19,
              display: 'Sao Paulo',
              order: null,
            },
            {
              id: 'location_brazil',
              uniqueId: 18,
              display: 'Brazil',
              order: null,
            },
            {
              id: 'location_newyork',
              uniqueId: 20,
              display: 'New York',
              order: null,
            },
          ],
          read: true,
          write: true,
        },
        setting,
        {
          id: 7,
          manifestId: 'idle_timeout_secs',
          exhibitId: 8,
          type: 'IntegerInput',
          display: 'Idle Timeout (secs)',
          value: 60,
          default: '60',
          order: null,
          touchless: true,
          listId: null,
          groupId: null,
          items: [],
          read: true,
          write: true,
        },
      ],
      statuses: [
        {
          id: 9,
          manifestId: 'last_server_start',
          exhibitId: 8,
          type: STATUS_TYPE.STRING,
          display: 'Last server start',
          value: 'Tue Feb 06 2024 08:47:01 GMT-0500 (Eastern Standard Time)',
          default: '',
          order: 0,
          read: true,
          write: true,
          updatedAt: '2024-02-13T15:28:04.314Z',
        },
      ],
      controls: [
        {
          id: 6,
          manifestId: 'down',
          exhibitId: 8,
          type: 'Single',
          display: 'Down',
          controlGroupId: null,
          order: null,
          touchless: true,
          items: [],
          read: true,
          write: true,
        },
        {
          id: 7,
          manifestId: 'group1',
          exhibitId: 8,
          type: 'Group',
          display: 'Group Z',
          controlGroupId: null,
          order: null,
          touchless: true,
          items: [
            {
              id: 'groupZItem2',
              uniqueId: 6,
              display: 'Group Z Item 2',
              order: 1,
            },
            {
              id: 'groupZItem1',
              uniqueId: 5,
              display: 'Group Z Item 1',
              order: 2,
            },
          ],
          read: true,
          write: true,
        },
        {
          id: 8,
          manifestId: 'group2',
          exhibitId: 8,
          type: 'Group',
          display: 'Group A',
          controlGroupId: null,
          order: null,
          touchless: true,
          items: [
            {
              id: 'groupAItem1',
              uniqueId: 7,
              display: 'Group A Item 1',
              order: null,
            },
            {
              id: 'groupAItem2',
              uniqueId: 8,
              display: 'Group A Item 2',
              order: null,
            },
          ],
          read: true,
          write: true,
        },
        {
          id: 9,
          manifestId: 'long title',
          exhibitId: 8,
          type: 'Single',
          display:
            'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          controlGroupId: null,
          order: null,
          touchless: true,
          items: [],
          read: true,
          write: true,
        },
        {
          id: 11,
          manifestId: 'up',
          exhibitId: 8,
          type: 'Single',
          display: 'Up',
          controlGroupId: null,
          order: null,
          touchless: true,
          items: [],
          read: true,
          write: true,
        },
      ],
      strapiContent: [],
    };
  });

  describe('findSetting', () => {
    it('non-existing Setting should not be returned', () => {
      expect(
        findSetting(manifest.settings, 'non-existing manifestId')
      ).toBeUndefined();
    });

    it('find direct Setting', () => {
      expect(findSetting(manifest.settings, setting.manifestId)).toBe(setting);
    });

    it('find nested Setting in SettingList', () => {
      expect(findSetting(manifest.settingLists, nestedSetting.manifestId)).toBe(
        nestedSetting
      );
    });

    it('find direct SettingGroup', () => {
      expect(findSetting(manifest.settingGroups, settingGroup.manifestId)).toBe(
        settingGroup
      );
    });

    it('find SettingList nested in SettingList', () => {
      expect(
        findSetting(manifest.settingLists, nestedSettingListInList.manifestId)
      ).toBe(nestedSettingListInList);
    });

    it('find SettingList nested in SettingGroup', () => {
      expect(
        findSetting(
          settingGroup.settingLists,
          nestedSettingListInGroup.manifestId
        )
      ).toBe(nestedSettingListInGroup);
    });
  });
});
