import type { FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import { ActionTriggerButton } from '../../../../../../common/ActionTriggerButton';
import { IconButton } from '../../../../../../common/buttons/IconButton';
import { RefreshIcon } from '../../../../../../common/icons';
import { SettingLabelWrapper } from '../../../../../settings/SettingLabelWrapper';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { CustomHardwareReadOnlyFieldPropertyWrapper } from '../CustomHardwareReadOnlyFieldPropertyWrapper';
import './CustomHardwareFieldPropertyWrapper.css';

interface CustomHardwareFieldPropertyWrapperProps {
  propertyName: string;
  disabled?: boolean;
  propertyChanged: boolean;
  settable: boolean;
  loading: boolean;
  success: boolean;
  showRefreshButton: boolean;
  onRefresh: () => void;
  onSendValue: () => void;
  children: ReactNode;
  className: string;
}

export const CustomHardwareFieldPropertyWrapper: FunctionComponent<
  CustomHardwareFieldPropertyWrapperProps
> = ({
  propertyName,
  propertyChanged,
  settable,
  disabled,
  onRefresh,
  onSendValue,
  showRefreshButton,
  loading,
  success,
  children,
  className,
}) => {
  return (
    <MainPanelCoplanarSubpageBlockRow
      className={cx('CustomHardwareFieldPropertyWrapper', className)}
    >
      {settable ? (
        <>
          <div className='CustomHardwareFieldPropertyWrapper__labelAndActionWrapper'>
            <SettingLabelWrapper
              className='CustomHardwareFieldPropertyWrapper__labelWrapper'
              changed={propertyChanged}
            >
              {propertyName}
            </SettingLabelWrapper>
            <div className='CustomHardwareFieldPropertyWrapper__buttonWrapper'>
              {showRefreshButton && !(loading || success) && (
                <IconButton onClick={onRefresh}>
                  <RefreshIcon />
                </IconButton>
              )}
              <ActionTriggerButton
                busy={loading}
                success={success}
                disabled={disabled}
                onClick={onSendValue}
              />
            </div>
          </div>
          <div className='CustomHardwareFieldPropertyWrapper__fieldWrapper'>
            {children}
          </div>
        </>
      ) : (
        <CustomHardwareReadOnlyFieldPropertyWrapper propertyName={propertyName}>
          {children}
        </CustomHardwareReadOnlyFieldPropertyWrapper>
      )}
    </MainPanelCoplanarSubpageBlockRow>
  );
};
