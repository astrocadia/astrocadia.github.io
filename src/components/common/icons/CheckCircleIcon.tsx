import { SvgIcon, type SvgIconComponent, type SvgIconProps } from './SvgIcon';

const CheckCircleSVGPath = (
  <path d='M8.93747 10.875L7.68747 9.64583C7.53469 9.49306 7.36108 9.41667 7.16664 9.41667C6.97219 9.41667 6.79858 9.49306 6.6458 9.64583C6.49303 9.79861 6.41664 9.9757 6.41664 10.1771C6.41664 10.3785 6.49303 10.5556 6.6458 10.7083L8.41664 12.4792C8.56941 12.6319 8.74302 12.7083 8.93747 12.7083C9.13191 12.7083 9.30553 12.6319 9.4583 12.4792L13.3541 8.58333C13.5069 8.43056 13.5833 8.25347 13.5833 8.05208C13.5833 7.85069 13.5069 7.67361 13.3541 7.52083C13.2014 7.36806 13.0277 7.29167 12.8333 7.29167C12.6389 7.29167 12.4652 7.36806 12.3125 7.52083L8.93747 10.875ZM9.99997 18C8.90275 18 7.86803 17.7917 6.8958 17.375C5.92358 16.9583 5.07289 16.3854 4.34372 15.6562C3.61455 14.9271 3.04164 14.0764 2.62497 13.1042C2.2083 12.1319 1.99997 11.0972 1.99997 10C1.99997 8.88889 2.2083 7.85069 2.62497 6.88542C3.04164 5.92014 3.61455 5.07292 4.34372 4.34375C5.07289 3.61458 5.92358 3.04167 6.8958 2.625C7.86803 2.20833 8.90275 2 9.99997 2C11.1111 2 12.1493 2.20833 13.1146 2.625C14.0798 3.04167 14.9271 3.61458 15.6562 4.34375C16.3854 5.07292 16.9583 5.92014 17.375 6.88542C17.7916 7.85069 18 8.88889 18 10C18 11.0972 17.7916 12.1319 17.375 13.1042C16.9583 14.0764 16.3854 14.9271 15.6562 15.6562C14.9271 16.3854 14.0798 16.9583 13.1146 17.375C12.1493 17.7917 11.1111 18 9.99997 18ZM9.99997 16.5C11.8055 16.5 13.3402 15.8681 14.6041 14.6042C15.868 13.3403 16.5 11.8056 16.5 10C16.5 8.19444 15.868 6.65972 14.6041 5.39583C13.3402 4.13194 11.8055 3.5 9.99997 3.5C8.19441 3.5 6.65969 4.13194 5.3958 5.39583C4.13191 6.65972 3.49997 8.19444 3.49997 10C3.49997 11.8056 4.13191 13.3403 5.3958 14.6042C6.65969 15.8681 8.19441 16.5 9.99997 16.5Z' />
);

export const CheckCircleIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{CheckCircleSVGPath}</SvgIcon>
);

CheckCircleIcon.muiName = 'CheckCircleIcon';
