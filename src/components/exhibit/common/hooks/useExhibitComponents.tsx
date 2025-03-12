import { useMemo } from 'react';
import {
  useListExhibitHardwareComponentsQuery,
  useListExhibitSoftwareComponentsQuery,
} from '../../../../app/services/exhibitComponents';
import { type ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';

/**
 * The purpose of this hook is to be a re-useable way for a page to get the list of exhibit components.
 * To do this, the hook makes to RTK query service calls and merges the returned list of components.
 *
 * This hook returns a few properties that are meant to represent the state of both queries based on the returned values from both the RTK queries.
 *  - components this is the list of returned components from both queries
 *  - isLoading this is an OR opperation of the isLoading property from both RTK queries, so if either request is loading, this will be true
 *  - isError this is OR opperation of the isError property from both RTK queries, so if either request has errored, this will be true
 *
 * This hook itself does not mimic all the properties of an RTK query, to account for this, it also returns two error objects that correspond to each query for custom error rendering based on a specific error from a specific request:
 *  - listSoftwareComponentsError
 *  - listHarwdareComponentsError
 *
 * Furthermore the hook resturns the full RTK query object from both requests as:
 *  - listSoftwareComponentsQuery
 *  - listHarwdareComponentsQuery
 * any specific RTK functionality for either request can be found as listSoftwareComponentsQuery.* or listHardwareComponentsQuery.*
 * @param exhibitId
 * @returns
 */
export const useExhibitComponentsList = (exhibitId: number) => {
  const listSoftwareComponentsQuery = useListExhibitSoftwareComponentsQuery({
    exhibitId,
  });

  const listHardwareComponentsQuery = useListExhibitHardwareComponentsQuery({
    exhibitId,
  });

  const {
    components,
    isError,
    isLoading,
    listSoftwareComponentsError,
    listHardwareComponentsError,
  } = useMemo(() => {
    const {
      data: softwareComponents,
      isLoading: isListSoftwareComponentsLoading,
      isError: isListSoftwareComponentsError,
      error: newListSoftwareComponentsError,
    } = listSoftwareComponentsQuery;

    const {
      data: hardwareComponents,
      isLoading: isListHardwareComponentsLoading,
      isError: isListHardwareComponentsError,
      error: newListHardwareComponentsError,
    } = listHardwareComponentsQuery;

    const newIsLoading =
      isListHardwareComponentsLoading || isListSoftwareComponentsLoading;
    const newIsError =
      isListHardwareComponentsError || isListSoftwareComponentsError;

    let newComponents: Array<ExhibitComponentSummary> = [];

    if (softwareComponents) {
      newComponents = newComponents.concat(softwareComponents);
    }

    if (hardwareComponents) {
      newComponents = newComponents.concat(hardwareComponents);
    }

    newComponents.sort((componentA, componentB) => {
      const createdAtA = new Date(componentA.createdAt);
      const createdAtB = new Date(componentB.createdAt);
      return createdAtA.getTime() - createdAtB.getTime();
    });

    return {
      components: newIsLoading || newIsError ? undefined : newComponents,
      isError: newIsError,
      isLoading: newIsLoading,
      listSoftwareComponentsError: newListSoftwareComponentsError,
      listHardwareComponentsError: newListHardwareComponentsError,
    };
  }, [listSoftwareComponentsQuery, listHardwareComponentsQuery]);

  return {
    components,
    isLoading,
    isError,
    listSoftwareComponentsError,
    listHardwareComponentsError,
    listSoftwareComponentsQuery,
    listHardwareComponentsQuery,
  };
};
