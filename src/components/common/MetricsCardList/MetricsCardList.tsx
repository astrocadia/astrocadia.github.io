import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { CardList, type CardListProps } from '../CardList';
import './MetricsCardList.css';

export const MetricsCardList: FunctionComponent<CardListProps> = ({
  className,
  children,
}) => (
  <CardList className={cx('MetricsCardList', className)}>{children}</CardList>
);
