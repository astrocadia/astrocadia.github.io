import cx from 'classnames';
import {
  useEffect,
  useMemo,
  useRef,
  type FunctionComponent,
  memo,
  ReactElement,
} from 'react';
import { Card } from '../Card';
import { Dot, type DotProps } from '../Dot';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { RichTooltip } from '../RichTooltip';
import { useToggle } from '../hooks/useToggle';
import './MetricsCard.css';
import { type MetricsCardVariant } from './common/metricsCard';

const DEFAULT_EMPTY_VALUE = '\u2014'; // em dash

export type MetricsCardValue = string | Array<string> | undefined;

export interface MetricsCardProps {
  className?: string;
  DotProps?: DotProps;
  subtitle: string;
  title: string;
  value?: MetricsCardValue;
  variant?: MetricsCardVariant;
  unit?: string;
  icon?: ReactElement;
  valueColor?: string;
}

export const MetricsCard: FunctionComponent<MetricsCardProps> = memo(
  ({
    className,
    DotProps,
    subtitle,
    title,
    value,
    variant = 'numerical',
    unit = undefined,
    icon = undefined,
    valueColor = 'var(--typography-primary-color)',
  }) => {
    const valueRef = useRef<HTMLDivElement>(null);
    const {
      toggled: showTooltip,
      setOn: setShowTooltip,
      setOff: setHideTooltip,
    } = useToggle(false);

    useEffect(() => {
      if (!valueRef.current || variant === 'numerical') {
        return undefined;
      }

      const valueObserver = new ResizeObserver(() => {
        if (valueRef.current?.clientHeight !== valueRef.current?.scrollHeight) {
          setShowTooltip();
        } else {
          setHideTooltip();
        }
      });

      valueObserver.observe(valueRef.current);
      return () => {
        valueObserver.disconnect();
      };
    }, [setHideTooltip, setShowTooltip, variant]);

    const cardValue = useMemo(() => {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return DEFAULT_EMPTY_VALUE;
        }

        const formatter = new Intl.ListFormat();
        return formatter.format(value);
      }

      if (!value) {
        return DEFAULT_EMPTY_VALUE;
      }

      return value;
    }, [value]);

    const tooltipTitle = useMemo(() => {
      if (showTooltip) {
        if (Array.isArray(value)) {
          return (
            <List className='MetricsCard__tooltipList' disablePadding>
              {value.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={index} disableGutters>
                  {item}
                </ListItem>
              ))}
            </List>
          );
        }

        return value;
      }

      return undefined;
    }, [showTooltip, value]);

    const metricCard = useMemo(
      () => (
        <Card
          className={cx('MetricsCard', `MetricsCard__${variant}`, className)}
        >
          <div className='MetricsCard__headingWrapper'>
            <div className='MetricsCard__titleWrapper'>
              <div className='MetricsCard__title'>{title}</div>
              {DotProps && <Dot {...DotProps} />}
            </div>
            <div className='MetricsCard__subtitle'>{subtitle}</div>
          </div>
          <div
            ref={valueRef}
            className={cx(
              'MetricsCard__value',
              !value && 'MetricsCard__emptyValue'
            )}
          >
            {!!icon && variant === 'numerical' && (
              <div className='MetricsCard__icon'> {icon} </div>
            )}
            <div style={{ color: valueColor }}>{cardValue}</div>
            {!!unit && !!value && variant === 'numerical' && (
              <div className='MetricsCard__unit'>{unit}</div>
            )}
          </div>
        </Card>
      ),
      [
        variant,
        className,
        title,
        DotProps,
        subtitle,
        value,
        icon,
        valueColor,
        cardValue,
        unit,
      ]
    );

    return showTooltip ? (
      <RichTooltip title={tooltipTitle}>{metricCard}</RichTooltip>
    ) : (
      metricCard
    );
  }
);

MetricsCard.displayName = 'MetricsCard';
