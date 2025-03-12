import cx from 'classnames';
import { ReactNode, type FunctionComponent } from 'react';
import { CardContent } from '../../../common/CardContent';
import { MainPanelCoplanarSubpageBlockRow } from '../MainPanelCoplanarSubpageBlockRow';
import {
  MainPanelCoplanarSubpageCardHeader,
  MainPanelCoplanarSubpageCardHeaderProps,
} from '../common/MainPanelCoplanarSubpageCardHeader';
import { BlockRowVariant } from '../common/types';
import './MainPanelCoplanarSubpageCard.css';

export interface MainPanelCoplanarSubpageCardProps
  extends MainPanelCoplanarSubpageCardHeaderProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  variant?: BlockRowVariant;
}

export const MainPanelCoplanarSubpageCard: FunctionComponent<
  MainPanelCoplanarSubpageCardProps
> = ({
  onClick,
  className,
  children,
  title,
  subtitle,
  badgeProps,
  headerAction,
  variant,
}) => {
  return (
    <MainPanelCoplanarSubpageBlockRow
      onClick={onClick}
      className={cx('MainPanelCoplanarSubpageCard', className, {
        MainPanelCoplanarSubpageCard__clickable: !!onClick,
      })}
      variant={variant}
    >
      <CardContent
        className='MainPanelCoplanarSubpageCard__content'
        slot='button'
      >
        <MainPanelCoplanarSubpageCardHeader
          title={title}
          subtitle={subtitle}
          badgeProps={badgeProps}
          headerAction={headerAction}
        />
        {children}
      </CardContent>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
