import { useMediaQuery } from '@mui/material';
import { MOBILE_DEVICE_WIDTH_PX } from '../../../styles/constants';

/**
 * The purpose of this hook is create a single source of truth for the mobile media query
 *
 * @returns true if the screen is mobile size
 */
export const useMobileMediaQuery = () => {
  const mobile = useMediaQuery(`(max-width: ${MOBILE_DEVICE_WIDTH_PX}px)`);

  return mobile;
};
