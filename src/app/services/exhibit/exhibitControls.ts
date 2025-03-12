import type { Exhibit } from '../../entities/exhibit';
import type { Control, ControlGroupItem } from '../../entities/exhibitManifest';
import { api, getHTTPEndpoint } from '../api';
import type { SuccessResponse } from '../common/responses';

export interface ExhibitControlTriggerRequestParameters {
  exhibitId: Exhibit['id'];
  controlId: Control['id'];
  itemId?: ControlGroupItem['id'];
}

const exhibitControlsApi = api.injectEndpoints({
  endpoints: (build) => ({
    triggerExhibitControl: build.mutation<
      SuccessResponse,
      ExhibitControlTriggerRequestParameters
    >({
      query: ({ exhibitId, controlId, itemId }) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/${exhibitId}/control/${controlId}`,
        method: 'POST',
        params: { itemId },
      }),
    }),
  }),
});

export const { useTriggerExhibitControlMutation } = exhibitControlsApi;
