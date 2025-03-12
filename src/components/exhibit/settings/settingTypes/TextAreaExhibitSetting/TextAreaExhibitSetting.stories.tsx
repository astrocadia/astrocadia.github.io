import type { Meta, StoryObj } from '@storybook/react';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { TextAreaExhibitSetting } from './TextAreaExhibitSetting';

const meta: Meta<typeof TextAreaExhibitSetting> = {
  title:
    'Design System/Composite Components/Exhibit Settings/TextAreaExhibitSetting',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: TextAreaExhibitSetting,
};

export default meta;
type Story = StoryObj<typeof TextAreaExhibitSetting>;

export const Default: Story = {
  args: {
    setting: {
      type: SettingTypes.TEXT_AREA_INPUT,
      display: 'TextArea Input with Write Permissions',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mi leo, auctor nec quam id, sollicitudin elementum nisl. Donec volutpat mattis tellus, id fermentum nibh semper condimentum. Nam commodo maximus nisi. Mauris nec tempus eros, semper lobortis sem. Aenean hendrerit eget massa non tincidunt. Mauris sollicitudin lorem justo, convallis posuere mi sagittis quis. Etiam maximus fermentum arcu, ac tincidunt lectus pulvinar nec. Vivamus egestas dictum arcu, in maximus dui luctus a.',
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
      type: SettingTypes.TEXT_AREA_INPUT,
      display: 'TextArea Input without Write Permissions',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mi leo, auctor nec quam id, sollicitudin elementum nisl. Donec volutpat mattis tellus, id fermentum nibh semper condimentum. Nam commodo maximus nisi. Mauris nec tempus eros, semper lobortis sem. Aenean hendrerit eget massa non tincidunt. Mauris sollicitudin lorem justo, convallis posuere mi sagittis quis. Etiam maximus fermentum arcu, ac tincidunt lectus pulvinar nec. Vivamus egestas dictum arcu, in maximus dui luctus a.',
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
