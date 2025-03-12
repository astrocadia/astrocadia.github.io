import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { Badge } from '../../../../common/badges';
import { GroupExhibitSettingCard } from './GroupExhibitSettingCard';

const meta: Meta<typeof GroupExhibitSettingCard> = {
  title:
    'Design System/Composite Components/Exhibit Settings/GroupExhibitSettingCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: GroupExhibitSettingCard,
};

export default meta;
type Story = StoryObj<typeof GroupExhibitSettingCard>;

export const Default: Story = {
  args: {
    settingGroup: {
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
      settingLists: [
        {
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
        },
      ],
    },
    onSelect: () => {},
  },
};

export const WithAction: Story = {
  args: {
    ...Default.args,
    action: <Badge variant='circle' label='5' />,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
