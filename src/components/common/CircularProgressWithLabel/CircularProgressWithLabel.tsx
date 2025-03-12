import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FunctionComponent } from 'react';
import {
  CircularProgress,
  type CircularProgressProps,
} from '../CircularProgress';

export type CircularProgressWithLabelProps = Omit<
  CircularProgressProps,
  'variant'
>;

export const CircularProgressWithLabel: FunctionComponent<
  CircularProgressWithLabelProps
> = ({ value = 0, ...props }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' value={value} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};
