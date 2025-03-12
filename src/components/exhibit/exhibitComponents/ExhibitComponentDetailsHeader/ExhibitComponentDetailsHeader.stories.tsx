import type { Meta, StoryObj } from '@storybook/react';
import { type DetailTableProps } from '../../../DetailTable';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { ExhibitComponentDetailsHeader } from './ExhibitComponentDetailsHeader';
import { ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';

const defaultData: DetailTableProps['data'] = [
  {
    label: 'IP & MQTT Port',
    value: '20.30.30.10:2049',
  },
  {
    label: 'SDK Version',
    value: '1.0.30',
  },
  {
    label: 'Created',
    value: '04/12/2023 11:32:04 am',
  },
];

const connectedData: DetailTableProps['data'] = [
  {
    label: 'Last Startup',
    value: '04/12/2023 11:32:04 am',
  },
  { label: 'Uptime', value: '2 weeks, 4 days, 10 hours' },
];

const infoData: DetailTableProps['data'] = [
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

const meta: Meta<typeof ExhibitComponentDetailsHeader> = {
  title: 'Design System/Composite Components/ExhibitComponentDetailsHeader',
  tags: ['autodocs'],
  component: ExhibitComponentDetailsHeader,
};

export default meta;
type Story = StoryObj<typeof ExhibitComponentDetailsHeader>;

const components: Array<Omit<ExhibitComponentSummary, 'createdAt' | 'order'>> =
  [
    {
      type: 'custom-application',
      name: "Patrick's Exhibit Code",
      category: 'software',
      connected: true,
      connectedChangedAt: '2023-04-12T11:32:04.000Z',
      componentId: 1,
      exhibitId: 1,
    },
    {
      type: 'custom-hardware',
      name: 'L4 Chimes 7',
      category: 'hardware',
      connected: false,
      connectedChangedAt: new Date(Date.now() - 600000).toISOString(),
      componentId: 1,
      exhibitId: 1,
    },
    {
      type: 'presence-sensor',
      name: 'Overhead mmWave Sensor',
      category: 'hardware',
      connected: true,
      connectedChangedAt: '2024-02-27T11:32:04.000Z',
      componentId: 1,
      exhibitId: 1,
    },
    {
      type: 'os-monitor',
      name: 'Host OS Monitor',
      category: 'software',
      connected: false,
      connectedChangedAt: '2024-03-09T11:32:04.000Z',
      componentId: 1,
      exhibitId: 1,
    },
  ];

export const Default: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
          }}
        >
          <ExhibitComponentDetailsHeader
            name={components[0].name}
            type={components[0].type}
            category={components[0].category}
            connected={components[0].connected}
            connectedChangedAt={components[0].connectedChangedAt}
            tick={new Date()}
            infoData={defaultData}
            exhibitId={components[0].exhibitId}
            componentId={components[0].componentId}
          />
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div style={{ backgroundColor: 'white', padding: '16px' }}>
          <ExhibitComponentDetailsHeader
            name={components[0].name}
            type={components[0].type}
            category={components[0].category}
            connected={components[0].connected}
            connectedChangedAt={components[0].connectedChangedAt}
            tick={new Date()}
            infoData={defaultData}
            exhibitId={components[0].exhibitId}
            componentId={components[0].componentId}
          />
          <div style={{ height: '20px' }} />
          <ExhibitComponentDetailsHeader
            name={components[1].name}
            type={components[1].type}
            category={components[1].category}
            connected={components[1].connected}
            connectedChangedAt={components[1].connectedChangedAt}
            tick={new Date()}
            connectionData={connectedData}
            infoData={infoData}
            exhibitId={components[1].exhibitId}
            componentId={components[1].componentId}
          />
          <div style={{ height: '20px' }} />
          <ExhibitComponentDetailsHeader
            name={components[2].name}
            type={components[2].type}
            category={components[2].category}
            connected={components[2].connected}
            connectedChangedAt={components[2].connectedChangedAt}
            tick={new Date()}
            connectionData={connectedData}
            infoData={infoData}
            exhibitId={components[2].exhibitId}
            componentId={components[2].componentId}
          />
          <div style={{ height: '20px' }} />
          <ExhibitComponentDetailsHeader
            name={components[3].name}
            type={components[3].type}
            category={components[3].category}
            connected={components[3].connected}
            connectedChangedAt={components[3].connectedChangedAt}
            tick={new Date()}
            connectionData={connectedData}
            infoData={defaultData}
            exhibitId={components[3].exhibitId}
            componentId={components[3].componentId}
          />
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const Overflow: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
          }}
        >
          <ExhibitComponentDetailsHeader
            name='This is a Really Long Name that will overflow and fill multiple lines of text and be really long and stuff'
            type={components[0].type}
            category={components[0].category}
            connected={components[0].connected}
            connectedChangedAt={components[0].connectedChangedAt}
            tick={new Date()}
            infoData={defaultData}
            exhibitId={components[0].exhibitId}
            componentId={components[0].componentId}
          />
        </div>
      </ThemeProviderWrapper>
    );
  },
};
