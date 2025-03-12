import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { SettingTypes } from '../../../../../app/entities/exhibitManifest';
import { store } from '../../../../../app/store';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { ExhibitSettingBlockCheckbox } from '../../../scheduling/schedulingCoplanar/SelectedExhibitSettingsCard/AddRemoveExhibitSettingsList/Checkboxes/ExhibitSettingBlockCheckbox';
import { ExhibitSetting } from '../../ExhibitSetting';
import { ListItemExhibitSettingCard } from './ListItemExhibitSettingCard';

const meta: Meta<typeof ListItemExhibitSettingCard> = {
  title:
    'Design System/Composite Components/Exhibit Settings/ListItemExhibitSettingCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Provider store={store}>
          <Story />
        </Provider>
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ListItemExhibitSettingCard,
  args: {
    renderSetting: (setting) => (
      <ExhibitSetting
        key={`setting-${setting.manifestId}`}
        setting={setting}
        exhibitId={
          setting.type === 'SettingsList' || setting.type === 'SettingsGroup'
            ? setting.ExhibitId
            : setting.exhibitId
        }
        onChange={() => {}}
        onSelect={() => {}}
        updatedValue={undefined}
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof ListItemExhibitSettingCard>;

export const Default: Story = {
  args: {
    listName: 'Sample List Name',
    settingListId: 1,
    manifestId: 'testTextInput',
    items: [
      {
        type: SettingTypes.TEXT_INPUT,
        display: 'First Text Import but ordered second',
        value: '123',
        manifestId: 'testTextInput / testTextInput',
        items: [],
        exhibitId: 1,
        id: 1,
        read: true,
        write: true,
        default: null,
        order: 1,
        touchless: null,
        listId: null,
        groupId: null,
      },
      {
        type: SettingTypes.TEXT_INPUT,
        display: 'Second Text Import but ordered first',
        value: 'ABC',
        manifestId: 'testTextInput /testTextInput',
        items: [],
        exhibitId: 1,
        id: 2,
        read: true,
        write: true,
        default: null,
        order: 0,
        touchless: null,
        listId: null,
        groupId: null,
      },
    ],
  },
};

export const NoActions: Story = {
  args: {
    listName: 'Sample List Name',
    settingListId: 1,
    manifestId: 'testTextInput',
    items: [
      {
        type: SettingTypes.TEXT_INPUT,
        display: 'First Text Import but ordered second',
        value: '123',
        manifestId: 'testTextInput / testTextInput',
        items: [],
        exhibitId: 1,
        id: 1,
        read: true,
        write: true,
        default: null,
        order: 1,
        touchless: null,
        listId: null,
        groupId: null,
      },
      {
        type: SettingTypes.TEXT_INPUT,
        display: 'Second Text Import but ordered first',
        value: 'ABC',
        manifestId: 'testTextInput /testTextInput',
        items: [],
        exhibitId: 1,
        id: 2,
        read: true,
        write: true,
        default: null,
        order: 0,
        touchless: null,
        listId: null,
        groupId: null,
      },
    ],
    onCopy: undefined,
    onMoveDown: undefined,
    onMoveUp: undefined,
    hideDelete: true,
  },
};

export const Checkboxes: Story = {
  args: {
    listName: 'Sample List Name',
    settingListId: 1,
    manifestId: 'testTextInput',
    items: [
      {
        type: SettingTypes.TEXT_INPUT,
        display: 'First Text Import but ordered second',
        value: '123',
        manifestId: 'testTextInput / testTextInput',
        items: [],
        exhibitId: 1,
        id: 1,
        read: true,
        write: true,
        default: null,
        order: 1,
        touchless: null,
        listId: null,
        groupId: null,
      },
      {
        type: SettingTypes.TEXT_INPUT,
        display: 'Second Text Import but ordered first',
        value: 'ABC',
        manifestId: 'testTextInput /testTextInput',
        items: [],
        exhibitId: 1,
        id: 2,
        read: true,
        write: true,
        default: null,
        order: 0,
        touchless: null,
        listId: null,
        groupId: null,
      },
    ],
    onCopy: undefined,
    onMoveDown: undefined,
    onMoveUp: undefined,
    hideDelete: true,
    renderSetting: (setting, i) => (
      <ExhibitSettingBlockCheckbox
        key={`settingCheckbox-${setting.manifestId}`}
        setting={setting}
        onClick={() => {}}
        onSelect={() => {}}
        checked={i % 2 !== 0}
        selectedSettings={[]}
      />
    ),
  },
};

export const NoSettings: Story = {
  args: {
    listName: 'Sample List Name',
    settingListId: 1,
    manifestId: 'testTextInput',
    items: [],
    onCopy: undefined,
    onMoveDown: undefined,
    onMoveUp: undefined,
    hideDelete: true,
  },
};
