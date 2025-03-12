import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { SingleButtonGroupExhibitSetting } from './SingleButtonGroupExhibitSetting';

const meta: Meta<typeof SingleButtonGroupExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/SingleButtonGroupExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: SingleButtonGroupExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof SingleButtonGroupExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.SINGLE_BUTTON_GROUP,
      display: 'Single Button Group Input with Write Permissions',
      value: 'button_two',
      manifestId: 'testButtonInput',
      items: [
        {
          id: 'button_two',
          uniqueId: 2,
          display: 'Button Two',
          order: 2,
        },
        {
          id: 'button_one',
          uniqueId: 5,
          display: 'Button One',
          order: 1,
        },
        {
          id: 'button_three',
          uniqueId: 6,
          display: 'Button Three',
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
      type: SettingTypes.SINGLE_BUTTON_GROUP,
      display: 'Single Button Group Input without Write Permissions',
      value: 'button_two',
      manifestId: 'testButtonInput',
      items: [
        {
          id: 'button_two',
          uniqueId: 2,
          display: 'Button Two',
          order: 2,
        },
        {
          id: 'button_one',
          uniqueId: 5,
          display: 'Button One',
          order: 1,
        },
        {
          id: 'button_three',
          uniqueId: 6,
          display: 'Button Three',
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
