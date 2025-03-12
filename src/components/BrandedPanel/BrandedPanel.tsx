import cx from 'classnames';
import { type FunctionComponent, type ReactNode } from 'react';
import GumbandLogoSrcUrl from '../../assets/logo/GumbandLogoPaddedDark.svg?url';
import { IconButton, type IconButtonProps } from '../common/buttons/IconButton';
import './BrandedPanel.css';
import { ArrowBackIcon, ArrowForwardIcon } from '../common/icons';

export interface BrandPanelProps {
  children?: ReactNode;
  className?: string;
  footer?: ReactNode;
  onBack?: IconButtonProps['onClick'];
  OnBackIconButtonProps?: IconButtonProps;
  onForward?: IconButtonProps['onClick'];
  OnForwardIconButtonProps?: IconButtonProps;
}

export const BrandedPanel: FunctionComponent<BrandPanelProps> = ({
  children,
  className,
  footer,
  onBack,
  OnBackIconButtonProps,
  onForward,
  OnForwardIconButtonProps,
}) => {
  return (
    <div className={cx(className, 'BrandedPanel')}>
      <div className='BrandedPanel__wrapper'>
        <div className='BrandedPanel__header'>
          <div className='BrandedPanel__back'>
            {onBack && (
              <IconButton
                variant='ghost'
                onClick={onBack}
                {...OnBackIconButtonProps}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
          </div>
          <img className='logo' src={GumbandLogoSrcUrl} alt='Gumband Logo' />
          <div className='BrandedPanel__forward'>
            {onForward && (
              <IconButton
                variant='ghost'
                onClick={onForward}
                {...OnForwardIconButtonProps}
              >
                <ArrowForwardIcon />
              </IconButton>
            )}
          </div>
        </div>
        <div className='BrandedPanel__content'>{children}</div>
      </div>
      {footer && <div className='BrandedPanel__footer'>{footer}</div>}
    </div>
  );
};
