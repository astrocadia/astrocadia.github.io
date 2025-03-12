import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { LoggingTable } from '.';
import type {
  ExhibitComponentSummary,
  ExhibitHardwareComponentSummary,
} from '../../app/entities/exhibitComponents';
import type { LogType } from '../../app/services/logs';

const meta: Meta<typeof LoggingTable> = {
  title: 'Design System/Composite Components/LoggingTable',
  tags: ['autodocs'],
  component: LoggingTable,
  args: {
    TableContainerProps: {
      style: {
        height: '50vh',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoggingTable>;

const TIMESTAMP = 1711045632695;
const FAKE_JSON_MESSAGE = {
  action: 'log',
  message: 'Invalid path for node "None"',
  severity: 'error',
  source: '/video/led_color/UGC2/_color_select',
  type: 'TOP',
};

const FAKE_JSON_ARRAY_MESSAGE = JSON.stringify([
  {
    action: 'log',
    message: 'Invalid path for node "None"',
    severity: 'error',
    source:
      '/video/led_color/UGC2/_color_select/moreselect/laksdjfalsdfj/aslkdfjalksdjfklasdjflka/asdflajsdfklajsdfklasdjfkljadsfklj',
    type: 'TOP',
  },
  {
    action: 'log',
    message: 'Invalid path for node "None"',
    severity: 'error',
    source: '/video/led_color/UGC2/_color_select',
    id: 3,
    isTrue: true,
    isFalse: false,
    nestedJson: FAKE_JSON_MESSAGE,
    nestedJsonArray: [
      FAKE_JSON_MESSAGE,
      [FAKE_JSON_MESSAGE, FAKE_JSON_MESSAGE],
    ],
  },
]);

const getFakeLogs = (logCount: number = 100) => {
  const logs = [];

  const exampleLogs: Array<LogType> = [
    {
      event_type: 'info',
      exhibitId: 1,
      timestamp: TIMESTAMP,
      log: {
        message: 'Welcome to Gumband!',
      },
    },
    {
      event_type: 'error',
      componentId: '1',
      timestamp: TIMESTAMP,
      exhibitId: 1,
      log: {
        message: {
          message:
            "Error decoding JSON: invalid character 'R' looking for beginning of value",
        },
      },
    },
    {
      event_type: 'debug',
      exhibitId: 1,
      timestamp: TIMESTAMP,
      log: {
        message: 'Connected!',
      },
    },
    {
      event_type: 'warn',
      exhibitId: 1,
      timestamp: TIMESTAMP,
      log: {
        message: '9319fe11-02b7-49b6-9bbd-03202698a2ce',
      },
    },
    {
      event_type: 'error',
      componentId: '1',
      exhibitId: 1,
      timestamp: TIMESTAMP,
      log: {
        message: { message: JSON.stringify(FAKE_JSON_MESSAGE, null, 2) },
      },
    },
    {
      event_type: 'error',
      componentId: '2',
      timestamp: TIMESTAMP,
      exhibitId: 1,
      log: {
        message: {
          message: FAKE_JSON_ARRAY_MESSAGE,
        },
      },
    },
  ];

  for (let i = 0; i < logCount; i++) {
    const baseLog = exampleLogs[i % exampleLogs.length];
    logs.push({ ...baseLog, id: i });
  }

  return logs;
};

const hardware: Array<ExhibitHardwareComponentSummary> = [
  {
    componentId: '8bfcb539-cf1e-405e-a92f-d2576cc7a033',
    exhibitId: 1,
    name: 'hardware-logging',
    type: 'custom-hardware',
    category: 'hardware',
    connected: true,
    connectedChangedAt: '2024-04-09T20:16:09.414Z',
    order: null,
    createdAt: '2024-03-26T17:21:32.976Z',
  },
  {
    componentId: 'a81fb720-a28c-4a0c-8a3a-cf1ea5cc473c',
    exhibitId: 1,
    name: 'hardware-logging',
    type: 'custom-hardware',
    category: 'hardware',
    connected: true,
    connectedChangedAt: '2024-04-09T20:16:09.414Z',
    order: null,
    createdAt: '2024-03-26T17:21:32.976Z',
  },
];

const software: Array<ExhibitComponentSummary> = [
  {
    componentId: 1,
    exhibitId: 1,
    name: 'software-logging',
    type: 'custom-application',
    category: 'software',
    connected: true,
    connectedChangedAt: '2024-04-09T20:16:09.414Z',
    isLegacyExhibit: true,
    order: null,
    createdAt: '2024-03-26T17:21:32.976Z',
  },
  {
    componentId: '30cb9bf2-50b6-46ee-96c5-dc02a0b6643d',
    exhibitId: 1,
    name: 'software-logging',
    type: 'custom-application',
    category: 'software',
    connected: true,
    connectedChangedAt: '2024-04-09T20:16:09.414Z',
    isLegacyExhibit: false,
    order: null,
    createdAt: '2024-03-26T17:21:32.976Z',
  },
];

export const Default: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <LoggingTable
        logs={getFakeLogs()}
        hardware={hardware}
        software={software}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
};

export const Loading: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <LoggingTable
        loading
        hardware={hardware}
        software={software}
        logs={getFakeLogs(0)}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
};

export const NoData: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <LoggingTable
        errorMessage='No logs available'
        hardware={hardware}
        software={software}
        logs={getFakeLogs(0)}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
};

export const NoMatchingLogs: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <LoggingTable
        errorMessage='0 of 289 logs matching selected filters'
        hardware={hardware}
        software={software}
        logs={getFakeLogs(0)}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
};

export const TooFewForFab: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <LoggingTable
        logs={getFakeLogs(2)}
        hardware={hardware}
        software={software}
        {...props}
      />
    </ThemeProviderWrapper>
  ),
};

export const ContainerQuery: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '12.5rem auto',
          gap: '1rem',
        }}
      >
        <div style={{ background: 'white' }}>Sidebar</div>
        <LoggingTable logs={getFakeLogs()} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LoadingContainerQuery: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '12.5rem auto',
          gap: '1rem',
        }}
      >
        <div style={{ background: 'white' }}>Sidebar</div>
        <LoggingTable logs={getFakeLogs()} loading {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};
