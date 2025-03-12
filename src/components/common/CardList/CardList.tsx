import cx from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import './CardList.css';

export interface CardListProps {
  className?: string;
  children?: ReactNode;
}

export const CardList: FunctionComponent<CardListProps> = ({
  className,
  children,
}) => <div className={cx('CardList', className)}>{children}</div>;
