import { useCallback, useState } from 'react';
import { MouseOrKeyboardEvent } from '../utils/eventHelpers';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = useCallback((event: MouseOrKeyboardEvent) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleOpenMenuAndStopPropagation = useCallback(
    (event: MouseOrKeyboardEvent) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    open,
    handleOpenMenu,
    handleOpenMenuAndStopPropagation,
    handleCloseMenu,
  };
};
