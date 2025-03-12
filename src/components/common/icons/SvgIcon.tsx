import { SvgIconComponent as MuiSvgIconComponent } from '@mui/icons-material';
import {
  SvgIcon as MuiSvgIcon,
  SvgIconProps as MuiSvgIconProps,
} from '@mui/material';

export type SvgIconComponent = MuiSvgIconComponent;
export type SvgIconProps = MuiSvgIconProps;

export const SvgIcon: SvgIconComponent = ({
  viewBox = '0 0 20 20',
  ...props
}: SvgIconProps) => <MuiSvgIcon viewBox={viewBox} {...props} />;

SvgIcon.muiName = 'SvgIcon';
