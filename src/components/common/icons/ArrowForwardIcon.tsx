import { SvgIcon, type SvgIconComponent, type SvgIconProps } from './SvgIcon';

const ArrowForwardSVGPath = (
  <path
    id='vector'
    d='M10.531 15.469C10.2378 15.7622 9.76225 15.7622 9.46897 15.469C9.17571 15.1757 9.17568 14.7003 9.4689 14.407L13.125 10.75H4.75C4.33579 10.75 4 10.4142 4 10C4 9.58579 4.33579 9.25 4.75 9.25H13.125L9.46891 5.59303C9.17568 5.29974 9.17571 4.82429 9.46897 4.53103C9.76225 4.23775 10.2378 4.23775 10.531 4.53103L15.2929 9.29289C15.6834 9.68342 15.6834 10.3166 15.2929 10.7071L10.531 15.469Z'
  />
);

export const ArrowForwardIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{ArrowForwardSVGPath}</SvgIcon>
);

ArrowForwardIcon.muiName = 'ArrowForwardIcon';
