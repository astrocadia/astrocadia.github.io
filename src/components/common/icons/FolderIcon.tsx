import { SvgIcon, SvgIconComponent, SvgIconProps } from './SvgIcon';

const FolderSvgPath = (
  <>
    <path d='M4 16C3.59722 16 3.24653 15.8507 2.94792 15.5521C2.64931 15.2535 2.5 14.9028 2.5 14.5V5.5C2.5 5.0875 2.64931 4.73438 2.94792 4.44063C3.24653 4.14688 3.59722 4 4 4H7.5C7.69929 4 7.88924 4.03472 8.06985 4.10417C8.25047 4.17361 8.41716 4.28472 8.56994 4.4375L9.85694 6.74366C9.94527 6.90192 10.1123 7 10.2936 7H16C16.4125 7 16.7656 7.14688 17.0594 7.44063C17.3531 7.73438 17.5 8.0875 17.5 8.5V14.5C17.5 14.9028 17.3531 15.2535 17.0594 15.5521C16.7656 15.8507 16.4125 16 16 16H4ZM4 14C4 14.2761 4.22386 14.5 4.5 14.5H15.5C15.7761 14.5 16 14.2761 16 14V9C16 8.72386 15.7761 8.5 15.5 8.5H9.93041C9.58499 8.5 9.26402 8.32173 9.08147 8.02848L7.6542 5.73576C7.56293 5.58913 7.40244 5.5 7.22973 5.5H4.5C4.22386 5.5 4 5.72386 4 6V14Z' />
    <path d='M10.9656 5.28565C11.1094 5.42855 11.2875 5.5 11.5 5.5H15.75C15.9625 5.5 16.1406 5.42708 16.2844 5.28125C16.4281 5.13542 16.5 4.95687 16.5 4.7456C16.5 4.53435 16.4281 4.35727 16.2844 4.21435C16.1406 4.07145 15.9625 4 15.75 4H11.5C11.2875 4 11.1094 4.07292 10.9656 4.21875C10.8219 4.36458 10.75 4.54313 10.75 4.7544C10.75 4.96565 10.8219 5.14273 10.9656 5.28565Z' />
  </>
);

export const FolderIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{FolderSvgPath}</SvgIcon>
);

FolderIcon.muiName = 'FolderIcon';
