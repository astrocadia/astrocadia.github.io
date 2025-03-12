import type { RepeatMode } from '../../../components/EventScheduleInput';
import type { Exhibit } from '../../entities/exhibit';
import {
  Control,
  IndividualSetting,
  Setting,
  StrapiOption,
  StrapiSetting,
} from '../../entities/exhibitManifest';
import { api, getHTTPEndpoint } from '../api';
import type { SuccessResponse } from '../common/responses';

export type ExhibitScheduledEventFrequency = {
  label: string;
  value: RepeatMode;
  altValue: string;
};

interface ScheduleControl {
  id: number; // Id of the schedulecontrol entity
  controlId: number; // Id of the control entity
  /*
    If the control is a GroupControl, then the control.items will contain ALL the control groupitems
    the controlGroupItemId is the uniqueId of the nested control within the Control Group items
  */
  controlGroupItemId: number;
  control: Pick<Control, 'type' | 'display' | 'id' | 'items'>;
}

export interface ScheduleSetting {
  id: number; // Id of the schedulesetting entity
  settingId: number; // Id of the setting entity
  // TODO: transform api response from (value: string) to (value: Exclude<IndividualSetting, StrapiSetting>['value'])
  value: string;
  setting: Pick<
    Exclude<IndividualSetting, StrapiSetting>,
    'id' | 'display' | 'type' | 'items'
  >;
}

export interface ScheduleStrapiContent {
  id: number; // Id of the schedulestrapicontent entity
  strapiContentId: number; // Id of the strapicontent entity
  value: StrapiOption['id']; // The id of the strapi content setting scheduled value
  strapicontent: Exclude<StrapiSetting, 'value'>;
}

export interface BaseExhibitScheduledEvent {
  id: number;
  name: string;
  startDate: string;
  recurringStartDate: string | null;
  endDate: string;
  recurringEndDate: string | null;
  recurring: boolean;
  opMode: boolean | null;
  completed: boolean;
  frequency: ExhibitScheduledEventFrequency;
  /** UUID  */
  recurringId: string | null;
  schedulecontrols: Array<ScheduleControl>;
  schedulesettings: Array<ScheduleSetting>;
  schedulestrapicontents: Array<ScheduleStrapiContent>;
}

export interface RecurringExhibitScheduledEvent
  extends BaseExhibitScheduledEvent {
  recurring: true;
  recurringId: string;
  recurringStartDate: string;
  recurringEndDate: string;
}

export interface NonRecurringExhibitScheduledEvent
  extends BaseExhibitScheduledEvent {
  recurring: false;
  recurringId: null;
  recurringStartDate: null;
  recurringEndDate: null;
}

export type ExhibitScheduledEvent =
  | RecurringExhibitScheduledEvent
  | NonRecurringExhibitScheduledEvent;

export type ScheduleControlManifest = Record<string, Control>; // key is control.id as string

export type ScheduleSettingsManifest = Record<string, Setting>; // key is setting.id as string

export type ScheduleStrapiContentManifest = Record<
  string,
  Omit<StrapiSetting, 'value'> & {
    value?: string; // strapi content option id as string
  }
>; // key is strapiContent.id as string

export type ScheduleManifest = {
  opMode?: boolean;
  controls: ScheduleControlManifest;
  settings: ScheduleSettingsManifest;
  strapiContent: ScheduleStrapiContentManifest;
};

interface ExhibitGetScheduledEventsRequestParameters {
  exhibitId: number;
}

interface ExhibitGetScheduledEventsResponse extends SuccessResponse {
  schedules: Array<ExhibitScheduledEvent>;
}

export interface ExhibitCreateEventRequestParameters {
  exhibitId: Exhibit['id'];
  manifest: ScheduleManifest;
  eventName: ExhibitScheduledEvent['name'];
  /** Unix timestamp (millis)  */
  startDate: number;
  /** Unix timestamp (millis)  */
  endDate: number;
  recurring: boolean;
  selectedFrequency: ExhibitScheduledEventFrequency;
}

interface ExhibitCreateEventResponse extends SuccessResponse {}

interface ExistingExhibitEventParameters {
  eventId: ExhibitScheduledEvent['id'];
  changeAll: boolean;
  recurringId?: ExhibitScheduledEvent['recurringId'];
}

export interface ExhibitUpdateEventRequestParameters
  extends ExhibitCreateEventRequestParameters,
    ExistingExhibitEventParameters {}

interface ExhibitUpdateEventResponse extends SuccessResponse {}

interface ExhibitDeleteEventRequestParameters
  extends ExistingExhibitEventParameters {}

interface ExhibitDeleteEventResponse extends SuccessResponse {}

export const exhibitSchedulingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getScheduledEvents: build.query<
      Array<ExhibitScheduledEvent>,
      ExhibitGetScheduledEventsRequestParameters
    >({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/scheduling/${exhibitId}`,
      }),
      transformResponse: (response: ExhibitGetScheduledEventsResponse) =>
        response.schedules,
      providesTags: ['ExhibitScheduledEvents'],
    }),
    createEvent: build.mutation<
      ExhibitCreateEventResponse,
      ExhibitCreateEventRequestParameters
    >({
      query: ({ exhibitId, ...body }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/scheduling/${exhibitId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ExhibitScheduledEvents'],
    }),
    updateEvent: build.mutation<
      ExhibitUpdateEventResponse,
      ExhibitUpdateEventRequestParameters
    >({
      query: ({ eventId, ...body }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/scheduling/${eventId}`,
        method: 'PUT',
        body: { ...body, eventId },
      }),
      invalidatesTags: ['ExhibitScheduledEvents'],
    }),
    deleteEvent: build.mutation<
      ExhibitDeleteEventResponse,
      ExhibitDeleteEventRequestParameters
    >({
      query: ({ eventId, recurringId, changeAll }) => {
        return {
          url: `${getHTTPEndpoint('exhibit')}/exhibit-management/scheduling/${eventId}`,
          method: 'DELETE',
          params: { recurringId, changeAll },
        };
      },
      invalidatesTags: ['ExhibitScheduledEvents'],
    }),
  }),
});

export const {
  useGetScheduledEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = exhibitSchedulingApi;

export const useGetScheduledEventById = (
  exhibitId: Exhibit['id'],
  eventId?: ExhibitScheduledEvent['id']
) => {
  return useGetScheduledEventsQuery(
    { exhibitId },
    {
      selectFromResult: ({ data, ...other }) => ({
        event: eventId
          ? data?.find((event) => event.id === eventId)
          : undefined,
        ...other,
      }),
    }
  );
};
