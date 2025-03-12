import { useState, type FunctionComponent } from 'react';
import cx from 'classnames';
import { type SvgIcon } from '../common/icons';
import {
  RecipientIndicator,
  type RecipientIndicatorProps,
} from '../RecipientIndicator';
import { CardContent } from '../common/CardContent';
import { AlertCardSkeleton } from './AlertCardSkeleton';
import { CardButton, type CardButtonProps } from '../CardButton';
import './AlertCard.css';

export interface AlertCardProps
  extends Pick<
      RecipientIndicatorProps,
      'userCount' | 'currentUser' | 'isCurrentUserIncluded'
    >,
    CardButtonProps {
  title: string;
  subtitle: string;
  icon: typeof SvgIcon;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  loading?: boolean;
}

export const AlertCard: FunctionComponent<AlertCardProps> = ({
  className,
  currentUser,
  userCount,
  title,
  subtitle,
  isCurrentUserIncluded,
  icon: Icon,
  loading = false,
  ...rest
}) => {
  const [indicatorOpen, setIndicatorOpen] = useState(false);

  if (loading) {
    return <AlertCardSkeleton className={className} {...rest} />;
  }

  return (
    <CardButton className={cx('AlertCard', className)} {...rest}>
      <CardContent>
        <div className='AlertCard__iconContainer'>
          <Icon />
        </div>
        <div className='AlertCard__titleContainer'>
          <div className='AlertCard__title'>{title}</div>
          <div className='AlertCard__subtitle'>{subtitle}</div>
        </div>
        <RecipientIndicator
          open={indicatorOpen}
          userCount={userCount}
          currentUser={currentUser}
          isCurrentUserIncluded={isCurrentUserIncluded}
          onOpenChange={setIndicatorOpen}
        />
      </CardContent>
    </CardButton>
  );
};
