import { SvgIcon, SvgIconComponent, SvgIconProps } from './SvgIcon';

const CheckboxUncheckedRect = (
  <rect
    x='3.5'
    y='3.5'
    width='13'
    height='13'
    rx='1.5'
    stroke='currentColor'
    strokeLinejoin='round'
  />
);

export const CheckboxUncheckedIcon: SvgIconComponent = (
  props: SvgIconProps
) => <SvgIcon {...props}>{CheckboxUncheckedRect}</SvgIcon>;

CheckboxUncheckedIcon.muiName = 'CheckboxUncheckedIcon';
