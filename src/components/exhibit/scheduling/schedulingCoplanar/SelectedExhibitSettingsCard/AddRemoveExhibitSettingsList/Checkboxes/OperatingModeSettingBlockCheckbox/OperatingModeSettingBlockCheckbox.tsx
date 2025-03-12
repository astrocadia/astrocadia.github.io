import { FunctionComponent } from 'react';
import cx from 'classnames';
import { OPERATING_MODE } from '../../../../../../common/lang';
import { BoltIcon } from '../../../../../../../common/icons';
import {
  MainPanelCoplanarSubpageBlockCheckbox,
  MainPanelCoplanarSubpageBlockCheckboxProps,
} from '../../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockCheckbox';
import './OperatingModeSettingBlockCheckbox.css';

export interface OperatingModeSettingBlockCheckboxProps
  extends Pick<
    MainPanelCoplanarSubpageBlockCheckboxProps,
    'checked' | 'onClick' | 'className'
  > {}

export const OperatingModeSettingBlockCheckbox: FunctionComponent<
  OperatingModeSettingBlockCheckboxProps
> = ({ className, ...rest }) => (
  <MainPanelCoplanarSubpageBlockCheckbox
    className={cx('OperatingModeSettingBlockCheckbox', className)}
    badgeProps={{ Icon: BoltIcon, variant: 'circle', size: 'large' }}
    title={OPERATING_MODE}
    {...rest}
  />
);
