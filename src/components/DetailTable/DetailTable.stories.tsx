import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { DetailTable, type DetailTableProps } from './DetailTable';

const meta: Meta<typeof DetailTable> = {
  title: 'Design System/Components/DetailTable',
  tags: ['autodocs'],
  component: DetailTable,
};

export default meta;
type Story = StoryObj<typeof DetailTable>;

const defaultData: DetailTableProps['data'] = [
  {
    label: 'IP',
    value: '20.30.30.10',
  },
  {
    label: 'MAC',
    value: '04:210:20:3b:92',
  },
  {
    label: 'Version',
    value: '48',
  },
  {
    label: 'Voltage',
    value: '4.204 V',
  },
  {
    label: 'Temperature',
    value: '39.028 C',
  },
  {
    label: 'Created',
    value: '2021-08-12 12:00:00 -0400',
  },
];

export const Default: Story = {
  render: ({ data = defaultData, ...props }) => (
    <ThemeProviderWrapper>
      <DetailTable {...props} data={data} />
    </ThemeProviderWrapper>
  ),
};
