import { useMemo } from 'react';
import {
  Control,
  ControlGroup,
  ControlSingle,
} from '../../../../app/entities/exhibitManifest';
import { sortControls } from '../utils/sorting';

export function useOrganizedControls(
  controls: Array<Control> | undefined
): [Array<ControlSingle> | undefined, Array<ControlGroup> | undefined] {
  const singleControls = useMemo(
    () =>
      controls
        ?.filter((control) => control.type === 'Single')
        ?.sort(sortControls),
    [controls]
  );

  const groupControls = useMemo(() => {
    const sortedGroupControls = controls
      ?.filter((control) => control.type === 'Group')
      ?.sort(sortControls);

    // Sort items in each group. Note: `sort` mutates the array so we need to create a new array of items
    return sortedGroupControls?.map((groupControl) => {
      return {
        ...groupControl,
        items: [...groupControl.items].sort(sortControls),
      };
    });
  }, [controls]);

  // @ts-expect-error for some reason these have the wrong types when running npm run build
  return [singleControls, groupControls];
}
