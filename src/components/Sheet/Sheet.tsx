import cx from 'classnames';
import { FunctionComponent } from 'react';
import { Drawer, DrawerProps } from '../common/Drawer';
import './Sheet.css';

export type SheetProps = DrawerProps;

export const Sheet: FunctionComponent<SheetProps> = ({
  anchor = 'bottom',
  children,
  className,
  ...props
}) => (
  <Drawer anchor={anchor} className={cx(className, 'Sheet')} {...props}>
    <div className='Sheet__tab' />
    <div className='Sheet__contentWrapper'>{children}</div>
  </Drawer>
);
