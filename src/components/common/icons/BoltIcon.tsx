import { SvgIcon, SvgIconComponent, SvgIconProps } from './SvgIcon';

const BoltSVGPath = (
  <path d='M8.85381 18C8.70114 18 8.58314 17.9513 8.49981 17.854C8.41648 17.7567 8.38881 17.6317 8.41681 17.479L9.18781 12.167H6.24981C6.05514 12.167 5.93014 12.101 5.87481 11.969C5.81948 11.837 5.84048 11.6877 5.93781 11.521L10.7078 3.271C10.7498 3.20167 10.8125 3.139 10.8958 3.083C10.9791 3.02767 11.0695 3 11.1668 3C11.3195 3 11.4375 3.04867 11.5208 3.146C11.6041 3.24333 11.6318 3.36833 11.6038 3.521L10.8538 8.812H13.7918C13.9858 8.812 14.1071 8.878 14.1558 9.01C14.2045 9.142 14.1801 9.29133 14.0828 9.458L9.31181 17.729C9.27048 17.7983 9.20814 17.861 9.12481 17.917C9.04148 17.9723 8.95114 18 8.85381 18Z' />
);

export const BoltIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{BoltSVGPath}</SvgIcon>
);

BoltIcon.muiName = 'BoltIcon';
