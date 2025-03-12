import { SvgIcon, SvgIconComponent, SvgIconProps } from './SvgIcon';

const GaugeLowSvgPath = (
  <path d='M9.9562 10.6875C9.6687 10.9625 9.31245 11.0906 8.88745 11.0719C8.46245 11.0531 8.14995 10.8938 7.94995 10.5938L4.04995 4.8L9.84664 8.70495C10.1572 8.91415 10.325 9.22813 10.35 9.64688C10.375 10.0656 10.2437 10.4125 9.9562 10.6875ZM8.9812 3C8.2312 3 7.5562 3.09688 6.9562 3.29063C6.3562 3.48438 5.81245 3.725 5.32495 4.0125L6.6187 4.85625C6.9687 4.69375 7.33432 4.56875 7.71558 4.48125C8.09683 4.39375 8.5187 4.35 8.9812 4.35C10.6073 4.35 11.992 4.93438 13.1352 6.10313C14.2784 7.27188 14.85 8.6375 14.85 10.2C14.85 10.675 14.8156 11.0656 14.7468 11.3719C14.6781 11.6781 14.5687 12.0375 14.4187 12.45H3.59995C3.43745 12.0375 3.32183 11.6594 3.25308 11.3156C3.18433 10.9719 3.14995 10.6 3.14995 10.2C3.14995 9.675 3.22183 9.15 3.36558 8.625C3.50933 8.1 3.7187 7.61875 3.9937 7.18125L3.18745 5.9625C2.74995 6.5625 2.40933 7.225 2.16558 7.95C1.92183 8.675 1.79995 9.4125 1.79995 10.1625C1.79995 10.8 1.85308 11.3563 1.95933 11.8313C2.06558 12.3063 2.23745 12.7438 2.47495 13.1438C2.59995 13.3563 2.75933 13.5188 2.95308 13.6313C3.14683 13.7438 3.36245 13.8 3.59995 13.8H14.4C14.6375 13.8 14.8531 13.7438 15.0468 13.6313C15.2406 13.5188 15.4 13.3563 15.525 13.1438C15.7625 12.7438 15.9343 12.3063 16.0406 11.8313C16.1468 11.3563 16.2 10.8 16.2 10.1625C16.2 9.16595 16.0093 8.23244 15.6281 7.36196C15.2468 6.49149 14.7312 5.73438 14.0812 5.09063C13.4312 4.44688 12.666 3.9375 11.7855 3.5625C10.905 3.1875 9.97024 3 8.9812 3Z' />
);

export const GaugeLow: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{GaugeLowSvgPath}</SvgIcon>
);

GaugeLow.muiName = 'GaugeLow';
