import { SvgIcon, SvgIconComponent, SvgIconProps } from './SvgIcon';

const FilterSvgPath = (
  <path d='M8.75 14.5C8.33579 14.5 8 14.1642 8 13.75C8 13.3358 8.33579 13 8.75 13H11.25C11.6642 13 12 13.3358 12 13.75C12 14.1642 11.6642 14.5 11.25 14.5H8.75ZM5.75 10.75C5.33579 10.75 5 10.4142 5 10C5 9.58579 5.33579 9.25 5.75 9.25H14.25C14.6642 9.25 15 9.58579 15 10C15 10.4142 14.6642 10.75 14.25 10.75H5.75ZM3.75 7C3.33579 7 3 6.66421 3 6.25C3 5.83579 3.33579 5.5 3.75 5.5H16.25C16.6642 5.5 17 5.83579 17 6.25C17 6.66421 16.6642 7 16.25 7H3.75Z' />
);

export const FilterIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{FilterSvgPath}</SvgIcon>
);

FilterIcon.muiName = 'FilterIcon';
