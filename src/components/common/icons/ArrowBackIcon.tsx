import { SvgIcon, type SvgIconComponent, type SvgIconProps } from './SvgIcon';

const ArrowBackSVGPath = (
  <path
    id='vector'
    d='M10.531 15.469C10.2378 15.7622 9.76225 15.7622 9.46897 15.469L4.70711 10.7071C4.31658 10.3166 4.31658 9.68342 4.70711 9.29289L9.46897 4.53103C9.76225 4.23775 10.2378 4.23775 10.531 4.53103C10.8243 4.82429 10.8243 5.29974 10.5311 5.59303L6.875 9.25H15.25C15.6642 9.25 16 9.58579 16 10C16 10.4142 15.6642 10.75 15.25 10.75H6.875L10.5311 14.407C10.8243 14.7003 10.8243 15.1757 10.531 15.469Z'
  />
);

export const ArrowBackIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{ArrowBackSVGPath}</SvgIcon>
);

ArrowBackIcon.muiName = 'ArrowBackIcon';
