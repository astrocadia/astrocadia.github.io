import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import type { Event } from 'react-big-calendar';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetScheduledEventsQuery,
  type ExhibitScheduledEvent,
} from '../../../app/services/exhibit';
import {
  generateExhibitPath,
  type ExhibitTab,
} from '../../../views/routes/exhibitRoutePaths';
import { BigCalendar, type BigCalendarProps } from '../../BigCalendar';
import { transformScheduledEventsToCalendarEvents } from '../../BigCalendar/utils/events';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { Button } from '../../common/buttons';
import { PlusIcon } from '../../common/icons';
import './ExhibitScheduling.css';
import { SCHEDULING_COPLANAR_MODE } from './schedulingCoplanar/common/coplanarMode';
import { encodeScheduleCoplanarId } from './utils/coplanarId';

const NEW_EVENT_BUTTON_LABEL = 'New Event' as const;
const TITLE = 'Schedule' as const;

export interface BigCalendarEvent extends Event {
  resource: ExhibitScheduledEvent;
}

interface ExhibitSchedulingProps {
  exhibitId: number;
  tabId: ExhibitTab;
}

export const ExhibitScheduling: FunctionComponent<ExhibitSchedulingProps> = ({
  exhibitId,
  tabId,
}) => {
  const navigate = useNavigate();
  const { data: events } = useGetScheduledEventsQuery({ exhibitId });
  const [selected, setSelected] = useState<Event>();
  const location = useLocation();

  useEffect(() => {
    // When we leave the edit coplanar, unselect the event
    if (!location.pathname.includes('edit')) {
      setSelected(undefined);
    }
  }, [location]);

  const bigCalendarEvents: BigCalendarProps['events'] = useMemo(() => {
    if (!events) {
      return [];
    }

    return transformScheduledEventsToCalendarEvents(events);
  }, [events]);

  const handleNewEvent = useCallback(() => {
    navigate(
      generateExhibitPath({
        exhibitId,
        tabId,
        coplanarId: encodeScheduleCoplanarId(SCHEDULING_COPLANAR_MODE.NEW),
      })
    );
  }, [navigate, exhibitId, tabId]);

  /** Typing was weird with useCallback because onSelectEvent is possibly undefined. */
  const handleSelectEvent: BigCalendarProps['onSelectEvent'] = useMemo(
    () => (event) => {
      if (!event.resource) {
        return;
      }
      setSelected(event);
      navigate(
        generateExhibitPath({
          exhibitId,
          tabId,
          coplanarId: encodeScheduleCoplanarId(
            SCHEDULING_COPLANAR_MODE.EDIT,
            event.resource.id.toString()
          ),
        })
      );
    },
    [navigate, exhibitId, tabId]
  );

  return (
    <>
      <MainPanelHeader
        title={TITLE}
        actions={[
          <Button
            key='newEvent'
            startIcon={<PlusIcon />}
            onClick={handleNewEvent}
          >
            {NEW_EVENT_BUTTON_LABEL}
          </Button>,
        ]}
      />
      <MainPanelContent className='ExhibitScheduling__mainPanelContent'>
        <BigCalendar
          events={bigCalendarEvents}
          onSelectEvent={handleSelectEvent}
          selected={selected}
        />
      </MainPanelContent>
    </>
  );
};
