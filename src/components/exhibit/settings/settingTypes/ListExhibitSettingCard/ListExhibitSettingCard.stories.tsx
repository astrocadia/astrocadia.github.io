import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { Badge } from '../../../../common/badges';
import { ListExhibitSettingCard } from './ListExhibitSettingCard';

const meta: Meta<typeof ListExhibitSettingCard> = {
  title:
    'Design System/Composite Components/Exhibit Settings/ListExhibitSettingCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ListExhibitSettingCard,
};

export default meta;
type Story = StoryObj<typeof ListExhibitSettingCard>;

export const Default: Story = {
  args: {
    settingList: {
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
