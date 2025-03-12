import cx from 'classnames';
import { FunctionComponent } from 'react';
import './TabDropdown.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tab, TabProps } from '../Tab';

export type TabDropdownProps = Omit<TabProps, 'selected'>;

export const TabDropdown: FunctionComponent<TabDropdownProps> = ({
  className,
  disabled = false,
  icon,
  label,
  onClick,
  showIndicator = false,
  ...props
}) => (
  <Tab
    className={cx(
      'TabDropdown',
      { TabDropdown__disabled: disabled },
      className
    )}
    disabled={disabled}
    onClick={onClick}
    showIndicator={showIndicator}
    selected={showIndicator}
    icon={icon}
    label={
      <>
        {label}
        <ExpandMoreIcon className='TabDropdown__ExpandMoreIcon' />
      </>
    }
    {...props}
  />
);
