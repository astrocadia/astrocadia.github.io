import type { Meta, StoryObj, Sto } from '@storybook/react';
import { useState, useCallback } from 'react';
import cx from 'classnames';
import { Collapse } from '@mui/material';
import { type DetailTableProps } from '../../../DetailTable';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { ExhibitComponentCoplanar } from './ExhibitComponentCoplanar';
import { ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';
import { ExhibitComponentDetailsHeader } from '../ExhibitComponentDetailsHeader';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import '../../../MainPanel/MainPanel.css';
import { useMobileMediaQuery } from '../../../common/hooks/useMobileMediaQuery';
import { ExhibitComponentCard } from '../ExhibitComponentCard/ExhibitComponentCard';
import { MainPanelContent } from '../../../MainPanel/MainPanelContent';
import { MainPanelHeader } from '../../../MainPanel/MainPanelHeader';
import { MainPanelCoplanarTitle } from '../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { CardList } from '../../../common/CardList';

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

const meta: Meta<typeof ExhibitComponentCoplanar> = {
  title: 'Michael Pflueger Portfolio/Coplanar',
  component: ExhibitComponentCoplanar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A coplanar component that slides open to access Hardware Device data.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExhibitComponentCoplanar>;

interface ExhibitComponentSummaryData extends ExhibitComponentSummary {
  connectedData: DetailTableProps['data'];
  infoData: DetailTableProps['data'];
}

export const Default: Story = {
  render: () => {
    const CoplanarComponent = () => {
      const components: Array<
        Omit<ExhibitComponentSummaryData, 'createdAt' | 'order'>
      > = [
        {
          type: 'custom-application',
          name: "Patrick's Exhibit Code",
          category: 'software',
          connected: true,
          connectedChangedAt: '2023-04-12T11:32:04.000Z',
          id: 1,
          exhibitId: 1,
          connectedData: defaultData,
          infoData: connectedData,
        },
        {
          type: 'custom-hardware',
          name: 'L4 Chimes 7',
          category: 'hardware',
          connected: false,
          connectedChangedAt: new Date(Date.now() - 600000).toISOString(),
          id: 1,
          exhibitId: 1,
          connectedData,
          infoData,
        },
        {
          type: 'presence-sensor',
          name: 'Overhead mmWave Sensor',
          category: 'hardware',
          connected: true,
          connectedChangedAt: '2024-02-27T11:32:04.000Z',
          id: 1,
          exhibitId: 1,
          connectedData,
          infoData,
        },
        {
          type: 'os-monitor',
          name: 'Host OS Monitor',
          category: 'software',
          connected: false,
          connectedChangedAt: '2024-03-09T11:32:04.000Z',
          id: 1,
          exhibitId: 1,
          connectedData: defaultData,
          infoData: connectedData,
        },
      ];

      const [selectedComponent, setSelectedComponent] = useState<number | null>(
        0
      );
      const [expanded, setExpanded] = useState(true);
      const isMobile = useMobileMediaQuery();
      const onClick = useCallback(
        (id: number) => {
          if (id === selectedComponent) {
            setExpanded(false);
          } else {
            setExpanded(true);
            setSelectedComponent(id);
          }
        },
        [selectedComponent, setExpanded]
      );
      const onClose = useCallback(() => {
        setExpanded(false);
      }, []);
      return (
        <ThemeProviderWrapper>
          <RouteWrapper>
            <div className='MainPanel'>
              <div className='MainPanel__contentWrapper'>
                <main className='MainPanel__sectionWrapper'>
                  <section className='MainPanel__mainContent'>
                    <MainPanelHeader title='Components' />
                    <MainPanelContent>
                      <CardList>
                        <ExhibitComponentCard
                          exhibitId={1}
                          id={0}
                          name={components[0].name}
                          category={components[0].category}
                          type={components[0].type}
                          connected={components[0].connected}
                          connectedChangedAt={components[0].connectedChangedAt}
                          tick={new Date()}
                          onClick={() => onClick(0)}
                        />

                        <ExhibitComponentCard
                          exhibitId={1}
                          id={1}
                          name={components[1].name}
                          category={components[1].category}
                          type={components[1].type}
                          connected={components[1].connected}
                          connectedChangedAt={components[1].connectedChangedAt}
                          tick={new Date()}
                          onClick={() => onClick(1)}
                        />

                        <ExhibitComponentCard
                          exhibitId={1}
                          id={2}
                          name={components[2].name}
                          category={components[2].category}
                          type={components[2].type}
                          connected={components[2].connected}
                          connectedChangedAt={components[2].connectedChangedAt}
                          tick={new Date()}
                          onClick={() => onClick(2)}
                        />

                        <ExhibitComponentCard
                          exhibitId={1}
                          id={3}
                          name={components[3].name}
                          category={components[3].category}
                          type={components[3].type}
                          connected={components[3].connected}
                          connectedChangedAt={components[3].connectedChangedAt}
                          tick={new Date()}
                          onClick={() => onClick(3)}
                        />
                      </CardList>
                    </MainPanelContent>
                  </section>
                  <Collapse
                    in={expanded}
                    className={cx({
                      MainPanel__collapsableSectionWrapper: !isMobile,
                    })}
                    orientation='horizontal'
                    easing={{
                      enter: 'ease-out',
                      exit: 'ease-in-out',
                    }}
                    timeout={350}
                    onExited={() => setSelectedComponent(null)}
                  >
                    <div
                      className={cx(
                        { MainPanel__coplanarContent: !isMobile },
                        { MainPanel__coplanarContentMobile: isMobile }
                      )}
                      style={{ height: '100vh' }}
                    >
                      <MainPanelCoplanarTitle
                        titleText='Component Details'
                        onClose={onClose}
                      />
                      {selectedComponent === null ? null : (
                        <ExhibitComponentDetailsHeader
                          name={components[selectedComponent].name}
                          type={components[selectedComponent].type}
                          category={components[selectedComponent].category}
                          connected={components[selectedComponent].connected}
                          connectedChangedAt={
                            components[selectedComponent].connectedChangedAt
                          }
                          tick={new Date()}
                          connectionData={
                            components[selectedComponent].connectedData
                          }
                          infoData={components[selectedComponent].infoData}
                          exhibitId={components[selectedComponent].exhibitId}
                          id={components[selectedComponent].id}
                        />
                      )}
                    </div>
                  </Collapse>
                </main>
              </div>
            </div>
          </RouteWrapper>
        </ThemeProviderWrapper>
      );
    };
    return <CoplanarComponent />;
  },
};
