import { useCallback, useMemo, useState } from 'react';

type FlagKey =
  | 'isRepeatModeDirty'
  | 'isDateTimeDirty'
  | 'isCustomRepeatDaysDirty'
  | 'isSelectedControlsDirty'
  | 'isSelectedSettingsDirty'
  | 'isOperatingModeDirty';

type Flags = Record<FlagKey, boolean>;

const DEFAULT_FLAGS: Flags = {
  isRepeatModeDirty: false,
  isDateTimeDirty: false,
  isCustomRepeatDaysDirty: false,
  isSelectedSettingsDirty: false,
  isSelectedControlsDirty: false,
  isOperatingModeDirty: false,
} as const;

export const useExhibitSchedulingCoplanarFlags = (): {
  flags: Flags;
  areFlagsDirty: boolean;
  setFlag: (key: FlagKey, value: boolean) => void;
  resetFlags: () => void;
} => {
  const [flags, setFlags] = useState(DEFAULT_FLAGS);

  const setFlag = useCallback((key: FlagKey, value: boolean) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFlags = useCallback(() => {
    setFlags(DEFAULT_FLAGS);
  }, []);

  const areFlagsDirty = useMemo(() => {
    return Object.keys(flags).reduce(
      (prev: boolean, flagKey) => prev || flags[flagKey as FlagKey],
      false
    );
  }, [flags]);

  return { flags, areFlagsDirty, setFlag, resetFlags };
};
