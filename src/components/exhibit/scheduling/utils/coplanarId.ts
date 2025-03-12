import {
  type SchedulingCoplanarMode,
  SCHEDULING_COPLANAR_MODE,
} from '../schedulingCoplanar/common/coplanarMode';

const KEY_SEPARATOR = '_' as const;

export type SchedulingCoplanarIdWithoutPayload<
  T extends SchedulingCoplanarMode,
> = T;

export type SchedulingCoplanarIdWithPayload<T extends SchedulingCoplanarMode> =
  `${SchedulingCoplanarIdWithoutPayload<T>}${typeof KEY_SEPARATOR}${string}`;

export type SchedulingCoplanarIdType<T extends SchedulingCoplanarMode> =
  | SchedulingCoplanarIdWithoutPayload<T>
  | SchedulingCoplanarIdWithPayload<T>;

export const isSchedulingCoplanarMode = (
  mode: string
): mode is SchedulingCoplanarMode => {
  return Object.values(SCHEDULING_COPLANAR_MODE).includes(
    mode as SchedulingCoplanarMode
  );
};

export type SchedulingNewEventCoplanarId = SchedulingCoplanarIdWithoutPayload<
  typeof SCHEDULING_COPLANAR_MODE.NEW
>;
export type SchedulingEditEventCoplanarId = SchedulingCoplanarIdWithPayload<
  typeof SCHEDULING_COPLANAR_MODE.EDIT
>;

export type SchedulingCoplanarId = (
  | SchedulingNewEventCoplanarId
  | SchedulingEditEventCoplanarId
) & { __brand: 'SchedulingCoplanarId' };

type ModeValidator = (payload: string | undefined) => boolean;

const VALIDATORS: Record<SchedulingCoplanarMode, ModeValidator> = {
  [SCHEDULING_COPLANAR_MODE.NEW]: (payload: string | undefined) => !payload,
  [SCHEDULING_COPLANAR_MODE.EDIT]: (payload: string | undefined) =>
    !!payload && Number.isInteger(Number(payload)),
} as const;

export const validateSchedulingModePayload = (
  mode: SchedulingCoplanarMode,
  payload: string | undefined
): boolean => VALIDATORS[mode](payload);

export const encodeScheduleCoplanarId = (
  mode: SchedulingCoplanarMode,
  payload?: string
): SchedulingCoplanarIdType<typeof mode> => {
  if (payload) {
    return `${mode}${KEY_SEPARATOR}${payload}`;
  }

  return mode;
};

export type DecodedScheduleCoplanarId = {
  mode: SchedulingCoplanarMode;
  payload?: string;
};

export const decodeScheduleCoplanarId = (
  coplanarId: string
): DecodedScheduleCoplanarId | undefined => {
  const [mode, payload] = coplanarId.split(KEY_SEPARATOR);

  if (isSchedulingCoplanarMode(mode)) {
    return { mode, payload: payload ?? undefined };
  }

  return undefined;
};

export const isValidScheduleCoplanarId = (
  coplanarId: string
): coplanarId is SchedulingCoplanarId => {
  const decoded = decodeScheduleCoplanarId(coplanarId);

  return (
    !!decoded && validateSchedulingModePayload(decoded.mode, decoded.payload)
  );
};
