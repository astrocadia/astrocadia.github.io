import { SvgIcon, type SvgIconComponent, type SvgIconProps } from './SvgIcon';

const ChevronSVGPath = (
  <path
    id='vector'
    d='M10.7071 12.3549C10.3166 12.7454 9.68342 12.7454 9.29289 12.3549L5.531 8.593C5.23774 8.29974 5.23774 7.82426 5.531 7.531C5.82426 7.23774 6.29974 7.23774 6.593 7.531L9.85858 10.7966C9.93668 10.8747 10.0633 10.8747 10.1414 10.7966L13.407 7.531C13.7003 7.23774 14.1757 7.23774 14.469 7.531C14.7623 7.82426 14.7623 8.29974 14.469 8.593L10.7071 12.3549Z'
  />
);

export const ChevronIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{ChevronSVGPath}</SvgIcon>
);

ChevronIcon.muiName = 'ChevronIcon';
