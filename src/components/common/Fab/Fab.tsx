import type { FunctionComponent } from 'react';
import { Fab as MuiFab, FabProps as MuiFabProps } from '@mui/material';
import classNames from 'classnames';
import './Fab.css';

interface FabProps extends Omit<MuiFabProps, 'color'> {}

export const Fab: FunctionComponent<FabProps> = ({ className, ...props }) => (
  <MuiFab className={classNames('Fab', className)} {...props} />
);
