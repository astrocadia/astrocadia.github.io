import cx from 'classnames';
import { type FunctionComponent } from 'react';
import {
  MainPanelCoplanarSubpageCard,
  MainPanelCoplanarSubpageCardProps,
} from '../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageCard';
import { Button, ButtonProps } from '../../../../../common/buttons';
import './ScheduleSelectedPropertiesCard.css';

export interface ScheduleSelectedPropertiesCardProps
  extends Omit<
    MainPanelCoplanarSubpageCardProps,
    'title' | 'headerAction' | 'onClick' | 'variant'
  > {
  label: string;
  buttonProps: ButtonProps;
}

export const ScheduleSelectedPropertiesCard: FunctionComponent<
  ScheduleSelectedPropertiesCardProps
> = ({ className, label, children, buttonProps, ...rest }) => {
  return (
    <MainPanelCoplanarSubpageCard
      className={cx('ScheduleSelectedPropertiesCard', className)}
      title={label}
      headerAction={<Button {...buttonProps} />}
      {...rest}
    >
      {children}
    </MainPanelCoplanarSubpageCard>
  );
};
