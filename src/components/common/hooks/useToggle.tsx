import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [toggled, setToggled] = useState(initialState);

  const toggle = useCallback(() => {
    setToggled((curr) => !curr);
  }, []);

  const setOn = useCallback(() => {
    setToggled(true);
  }, []);

  const setOff = useCallback(() => {
    setToggled(false);
  }, []);

  return {
    toggled,
    toggle,
    setOn,
    setOff,
  };
};
