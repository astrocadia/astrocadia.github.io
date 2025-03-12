import cx from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import { ChevronIcon } from '../common/icons';
import { type CardProps } from '../common/Card';
import { LinkCardContent, type LinkCardContentProps } from './LinkCardContent';
import { CardButton } from '../CardButton';
import { addOnEnterOrSpaceHandler } from '../common/utils/eventHelpers';
import './LinkCard.css';

export interface LinkCardProps
  extends CardProps,
    Pick<
      LinkCardContentProps,
      'label' | 'caption' | 'icon' | 'marked' | 'onClick'
    > {
  action?: ReactNode;
  onClick?: () => void;
}

export const LinkCard: FunctionComponent<LinkCardProps> = ({
  className,
  label,
  caption = '',
  icon,
  marked,
  action,
  onClick,
  onKeyUp,
}) => {
  const localOnKeyUp =
    onClick && !onKeyUp ? addOnEnterOrSpaceHandler(onClick) : onKeyUp;

  return (
    <CardButton
      className={cx('LinkCard', className, {
        LinkCard__disabled: !onClick,
      })}
      onClick={onClick}
      onKeyUp={localOnKeyUp}
    >
      <LinkCardContent
        className={cx({ LinkCard__disabled: !onClick })}
        icon={icon}
        label={label}
        caption={caption}
        marked={marked}
      />
      <div className='LinkCard__actionsWrapper'>
        {action}
        <div className='LinkCard__chevronWrapper'>
          <ChevronIcon />
        </div>
      </div>
    </CardButton>
  );
};
