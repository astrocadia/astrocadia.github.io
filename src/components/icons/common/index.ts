import { SvgIconComponent } from '../../common/icons';

export interface IconMapItem {
  className: string;
  Icon: SvgIconComponent;
}

export type IconMap<T extends string> = Record<T, IconMapItem>;
