import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import { CardList } from '../../../common/CardList';
import { ExhibitComponentCard } from './ExhibitComponentCard';
import { ExhibitComponentCardSkeleton } from './ExhibitComponentCardSkeleton';

const meta: Meta<typeof ExhibitComponentCard> = {
  title: 'Michael Pflueger Portfolio/Card/ExhibitComponentCard',
  tags: ['autodocs'],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A card for selecting exhibit components.',
      },
    },
  },
  component: ExhibitComponentCard,
};

export default meta;
type Story = StoryObj<typeof ExhibitComponentCard>;

const onClick = () => {
  // eslint-disable-next-line no-alert
  alert('ExhibitComponentCard clicked');
};

export const CustomSoftwareComponent: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ExhibitComponentCard
          componentId={1}
          exhibitId={1}
          type='custom-application'
          category='software'
          connected
          connectedChangedAt={new Date().toString()}
          tick={new Date()}
          name='Lorem ipsum dolor sit'
          onClick={onClick}
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const OSMonitorComponent: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ExhibitComponentCard
          componentId={1}
          exhibitId={1}
          type='os-monitor'
          category='software'
          connected
          connectedChangedAt={new Date().toString()}
          tick={new Date()}
          name='Lorem ipsum dolor sit'
          onClick={onClick}
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const CustomHardwareComponent: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ExhibitComponentCard
          componentId={1}
          exhibitId={1}
          type='custom-hardware'
          category='hardware'
          connected
          connectedChangedAt={new Date().toString()}
          tick={new Date()}
          name='Lorem ipsum dolor sit'
          onClick={onClick}
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const PresenceSensorComponent: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ExhibitComponentCard
          componentId={1}
          exhibitId={1}
          type='presence-sensor'
          category='hardware'
          connected
          connectedChangedAt={new Date().toString()}
          tick={new Date()}
          name='Lorem ipsum dolor sit'
          onClick={onClick}
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const LongTitle: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ExhibitComponentCard
          componentId={1}
          exhibitId={1}
          type='os-monitor'
          category='software'
          connected
          connectedChangedAt={new Date().toString()}
          tick={new Date()}
          name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          onClick={onClick}
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

const ConnectedStatusGranularityIntervals = {
  // the *.5 is used because the component uses Math.Floor()
  lessThanOneMinute: 1000 * 60 * 0.5,
  oneMinute: 1000 * 60 * 1.5,
  severalMinutes: 1000 * 60 * 45.5,
  oneHour: 1000 * 60 * 60 * 1.5,
  severalHours: 1000 * 60 * 60 * 12.5,
  oneDay: 1000 * 60 * 60 * 24 * 1.5,
  severalDays: 1000 * 60 * 60 * 24 * 12.5,
  oneMonth: 1000 * 60 * 60 * 24 * 32,
  severalMonths: 1000 * 60 * 60 * 24 * 32 * 10,
  oneYear: 1000 * 60 * 60 * 24 * 365 * 1.5,
  severalYears: 1000 * 60 * 60 * 24 * 365 * 3.5,
};

export const ConnectedStatus: Story = {
  render: () => {
    const now = new Date();

    const lessThanOneMinute = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.lessThanOneMinute
    ).toString();
    const oneMinute = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneMinute
    ).toString();
    const severalMinutes = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalMinutes
    ).toString();
    const oneHour = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneHour
    ).toString();
    const severalHours = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalHours
    ).toString();
    const oneDay = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneDay
    ).toString();
    const severalDays = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalDays
    ).toString();
    const oneMonth = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneMonth
    ).toString();
    const severalMonths = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalMonths
    ).toString();
    const oneYear = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneYear
    ).toString();
    const severalYears = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalYears
    ).toString();

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <CardList>
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={null}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={lessThanOneMinute}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={oneMinute}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={severalMinutes}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={oneHour}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={severalHours}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={oneDay}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={severalDays}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={oneMonth}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={severalMonths}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={oneYear}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected
              connectedChangedAt={severalYears}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
          </CardList>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const DisconnectedStatus: Story = {
  render: () => {
    const now = new Date();

    const lessThanOneMinute = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.lessThanOneMinute
    ).toString();
    const oneMinute = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneMinute
    ).toString();
    const severalMinutes = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalMinutes
    ).toString();
    const oneHour = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneHour
    ).toString();
    const severalHours = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalHours
    ).toString();
    const oneDay = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneDay
    ).toString();
    const severalDays = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalDays
    ).toString();
    const oneMonth = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneMonth
    ).toString();
    const severalMonths = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalMonths
    ).toString();
    const oneYear = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.oneYear
    ).toString();
    const severalYears = new Date(
      now.getTime() - ConnectedStatusGranularityIntervals.severalYears
    ).toString();

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <CardList>
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={null}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={lessThanOneMinute}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={oneMinute}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={severalMinutes}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={oneHour}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={severalHours}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={oneDay}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={severalDays}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={oneMonth}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={severalMonths}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={oneYear}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
            <ExhibitComponentCard
              componentId={1}
              exhibitId={1}
              type='custom-application'
              category='software'
              connected={false}
              connectedChangedAt={severalYears}
              tick={now}
              name='Lorem ipsum dolor sit'
              onClick={onClick}
            />
          </CardList>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const SkeletonExhibitComponentCard: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ExhibitComponentCardSkeleton />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const CardListExample: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <CardList>
          <ExhibitComponentCard
            componentId={0}
            exhibitId={0}
            type='custom-application'
            category='software'
            connected
            connectedChangedAt={new Date().toString()}
            tick={new Date()}
            name='Lorem ipsum dolor sit'
            onClick={onClick}
          />
          <ExhibitComponentCard
            componentId={1}
            exhibitId={1}
            type='os-monitor'
            category='software'
            connected={false}
            connectedChangedAt={new Date(
              new Date().getTime() - 1000 * 60 * 10.5
            ).toString()}
            tick={new Date()}
            name='amet consectetur adipisicing'
            onClick={onClick}
          />
          <ExhibitComponentCard
            componentId={2}
            exhibitId={2}
            type='custom-hardware'
            category='hardware'
            connected
            connectedChangedAt={new Date(
              new Date().getTime() - 1000 * 60 * 60 * 16.5
            ).toString()}
            tick={new Date()}
            name='Lorem ipsum dolor sit amet'
            onClick={onClick}
          />
          <ExhibitComponentCard
            componentId={3}
            exhibitId={3}
            type='presence-sensor'
            category='hardware'
            connected={false}
            connectedChangedAt={new Date(
              new Date().getTime() - 1000 * 60 * 60 * 24 * 45.5
            ).toString()}
            tick={new Date()}
            name='Lorem, ipsum dolor.'
            onClick={onClick}
          />
          <ExhibitComponentCard
            componentId={4}
            exhibitId={4}
            type='custom-hardware'
            category='hardware'
            connected
            connectedChangedAt={new Date(
              new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 1.5
            ).toString()}
            tick={new Date()}
            name='Lorem ipsum dolor sit amet consectetur adipisicing elit'
            onClick={onClick}
          />
          <ExhibitComponentCardSkeleton />
        </CardList>
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};
