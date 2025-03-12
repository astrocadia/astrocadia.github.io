import { FunctionComponent } from 'react';
import cx from 'classnames';
import { CloseIcon } from '../../../common/icons/CloseIcon';
import { IconButton } from '../../../common/buttons/IconButton';
import { ArrowBackIcon } from '../../../common/icons';
import './MainPanelCoplanarTitle.css';

export interface MainPanelCoplanarTitleProps {
  className?: string;
  titleText: string;
  subtitleText?: string;
  captionText?: string;
  onClose?: () => void;
  onBack?: () => void;
  actions?: React.ReactNode;
}

export const MainPanelCoplanarTitle: FunctionComponent<
  MainPanelCoplanarTitleProps
> = ({
  className,
  titleText,
  onClose,
  onBack,
  actions,
  subtitleText,
  captionText,
}) => {
  return (
    <div className={cx('MainPanel__coplanarTitleWrapper', className)}>
      <div className='MainPanel__coplanarTitleTop'>
        {onBack && (
          <div className='MainPanel__coplanarBackButtonWrapper'>
            <IconButton aria-label='Back' variant='ghost' onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
        )}
        <span className='MainPanel__coplanarTitleText'>{titleText}</span>
        {onClose && (
          <div className='MainPanel__coplanarCloseButtonWrapper'>
            <IconButton aria-label='Close' variant='ghost' onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
      {(subtitleText || captionText || actions) && (
        <div className='MainPanel__coplanarTitleBottom'>
          {(subtitleText || captionText) && (
            <div className='MainPanel__coplanarTitleSubtitleContainer'>
              {subtitleText && (
                <div className='MainPanel__coplanarTitleSubtitle'>
                  {subtitleText}
                </div>
              )}
              {captionText && (
                <div className='MainPanel__coplanarTitleCaption'>
                  {captionText}
                </div>
              )}
            </div>
          )}
          {actions && (
            <div className='MainPanel__coplanarTitleActions'>{actions}</div>
          )}
        </div>
      )}
    </div>
  );
};
