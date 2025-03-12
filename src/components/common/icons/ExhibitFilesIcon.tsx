import { SvgIcon, SvgIconComponent, SvgIconProps } from './SvgIcon';

const ExhibitFilesSvgPath = (
  <path d='M6.31025 14.0968C5.86639 14.0968 5.49047 13.9428 5.1825 13.6349C4.87451 13.3269 4.72052 12.9509 4.72052 12.5071V4.411C4.72052 3.96714 4.87451 3.59122 5.1825 3.28323C5.49047 2.97526 5.86639 2.82127 6.31025 2.82127H9.40433C9.94927 2.82127 10.4706 3.04363 10.8478 3.43693L11.13 3.73122C11.5072 4.12452 12.0286 4.34688 12.5735 4.34688H17.1307C17.5746 4.34688 17.9505 4.50087 18.2585 4.80886C18.5665 5.11684 18.7205 5.49277 18.7205 5.93663V12.5071C18.7205 12.9509 18.5665 13.3269 18.2585 13.6349C17.9505 13.9428 17.5746 14.0968 17.1307 14.0968H6.31025ZM16.1996 16.5135C16.1996 16.8817 15.9012 17.1801 15.533 17.1801H3.22694C2.78309 17.1801 2.40717 17.0261 2.09919 16.7181C1.7912 16.4102 1.63721 16.0342 1.63721 15.5904V6.78437C1.63721 6.41618 1.93568 6.11771 2.30386 6.11771C2.67205 6.11771 2.97052 6.41618 2.97052 6.78437V15.5904C2.97052 15.6545 2.99723 15.7133 3.05064 15.7667C3.10408 15.8201 3.16284 15.8468 3.22694 15.8468H15.533C15.9012 15.8468 16.1996 16.1453 16.1996 16.5135ZM8.10342 10.8096C8.00349 10.9413 8.09742 11.1305 8.26274 11.1305H15.1818C15.3474 11.1305 15.4412 10.9409 15.3409 10.8092L13.2152 8.02175C13.1359 7.91777 12.9798 7.9166 12.899 8.01937L11.006 10.4257C10.9259 10.5276 10.7716 10.5275 10.6915 10.4256L9.68339 9.14196C9.60247 9.03892 9.44597 9.04022 9.36677 9.1446L8.10342 10.8096Z' />
);

export const ExhibitFilesIcon: SvgIconComponent = (props: SvgIconProps) => (
  <SvgIcon {...props}>{ExhibitFilesSvgPath}</SvgIcon>
);

ExhibitFilesIcon.muiName = 'ExhibitFilesIcon';
