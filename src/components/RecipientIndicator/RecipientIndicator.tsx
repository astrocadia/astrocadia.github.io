import cx from 'classnames';
import { useMemo, type FunctionComponent, type HTMLAttributes } from 'react';
import { UserAvatar, type UserAvatarProps } from '../UserAvatar';
import { RecipientIcon } from '../common/icons';
import { addOnEnterOrSpaceHandler } from '../common/utils/eventHelpers';
import './RecipientIndicator.css';

const YOU_LABEL = 'You' as const;
const OPEN_ARIA_LABEL = 'Close avatar group' as const;
const CLOSED_ARIA_LABEL = 'Open avatar group' as const;

export interface RecipientIndicatorProps {
  className?: string;
  currentUser?: UserAvatarProps['user'];
  userCount: number;
  isCurrentUserIncluded: boolean;
  open: boolean;
  onOpenChange?: (open: boolean) => void; // Single event handler for toggle
}
export const RecipientIndicator: FunctionComponent<RecipientIndicatorProps> = ({
  className,
  currentUser,
  userCount,
  isCurrentUserIncluded,
  open,
  onOpenChange,
}) => {
  const currentUserButtonAttributes = useMemo<
    HTMLAttributes<HTMLDivElement>
  >(() => {
    if (!onOpenChange) return {};

    const onKeyUp = addOnEnterOrSpaceHandler(() => onOpenChange?.(!open));

    return {
      role: 'button',
      tabIndex: 0,
      'aria-label': open ? OPEN_ARIA_LABEL : CLOSED_ARIA_LABEL,
      'aria-expanded': open,
      onKeyUp,
      onMouseEnter: () => onOpenChange?.(true),
      onMouseLeave: () => onOpenChange?.(false),
      onFocus: () => onOpenChange?.(true),
      onBlur: () => onOpenChange?.(false),
    };
  }, [open, onOpenChange]);

  return (
    <div
      className={cx('RecipientIndicator', className, {
        RecipientIndicator__open: open,
        RecipientIndicator__button: onOpenChange,
      })}
    >
      {currentUser && isCurrentUserIncluded && (
        <div
          className='RecipientIndicator__currentUser'
          {...currentUserButtonAttributes}
        >
          <UserAvatar user={currentUser} />
          <div className='RecipientIndicator__youLabel'>{YOU_LABEL}</div>
        </div>
      )}
      <div className='RecipientIndicator__userCount'>
        <RecipientIcon />
        <div className='RecipientIndicator__userCountLabel'>{userCount}</div>
      </div>
    </div>
  );
};
