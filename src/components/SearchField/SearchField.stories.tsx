import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { SearchField, type SearchFieldProps } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Design System/Composite Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search',
    // eslint-disable-next-line no-console
    onClear: () => console.log('Reset'),
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  render: ({ value, onClear, ...args }) => {
    const [localValue, setLocalValue] = useState('');

    /**
     * For Storybook purposes only. If we pass an undefined onClear prop
     * to our render function, we don't want to set the onClear prop on the
     * SearchField component _or_ set localValue.
     */
    const handleClear = onClear
      ? () => {
          setLocalValue('');
          onClear();
        }
      : undefined;

    const handleOnChange: SearchFieldProps['onChange'] = (e) => {
      setLocalValue(e.target.value);
    };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 50%)',
          gap: '0.5rem',
          marginTop: '1rem',
        }}
      >
        <SearchField
          {...args}
          onChange={handleOnChange}
          onClear={handleClear}
          value={localValue}
        />
        <div className='body-1'>Value: {localValue}</div>
      </div>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WXkouxbpbj3I6bP5bBDvJk/GB2-Design-System?node-id=5225-11860&m=dev',
    },
    docs: {
      description: {
        component:
          'An uncontrolled search field component that includes a search icon and a clear button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const NoOnClear: Story = {
  name: 'No Clear Button (onClear = undefined)',
  args: {
    onClear: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'By leaving the `onClear` prop undefined, the reset button will not be rendered.',
      },
    },
  },
};
