import cx from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import {
  MetricsCard,
  MetricsCardProps,
  MetricsCardSkeleton,
} from '../MetricsCard';
import { MetricsCardList } from '../MetricsCardList';
import './MetricsPanel.css';

interface MetricsPanelProps {
  metricsCardProps?: Array<MetricsCardProps>;
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const MetricsPanel: FunctionComponent<MetricsPanelProps> = ({
  metricsCardProps,
  children,
  className,
  isLoading = false,
}) => {
  return (
    <div className={cx('MetricsPanel', className)}>
      {isLoading ? (
        <MetricsCardList>
          <MetricsCardSkeleton />
          <MetricsCardSkeleton />
          <MetricsCardSkeleton />
        </MetricsCardList>
      ) : (
        metricsCardProps &&
        metricsCardProps.length > 0 && (
          <MetricsCardList>
            {metricsCardProps.map((props, i) => (
              <MetricsCard
                {...props}
                // eslint-disable-next-line react/no-array-index-key
                key={i}
              />
            ))}
          </MetricsCardList>
        )
      )}
      <div className='MetricsPanel__chart'>{children}</div>
    </div>
  );
};
