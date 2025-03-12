import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { TextExhibitSetting } from './TextExhibitSetting';

const meta: Meta<typeof TextExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/TextExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: TextExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof TextExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.TEXT_INPUT,
      display: 'Text Input with Write Permissions',
      value: 'Starting Value',
      manifestId: 'testTextInput',
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
      type: SettingTypes.TEXT_INPUT,
      display: 'Text Input without Write Permissions',
      value: 'Starting Value',
      manifestId: 'testTextInput',
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
