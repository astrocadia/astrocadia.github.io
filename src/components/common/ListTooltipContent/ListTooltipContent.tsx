import cx from 'classnames';

import { Color } from 'chart.js';
import { Dot } from '../Dot';
import './ListTooltipContent.css';
import { isNil } from '../../../utils/lang';

export interface ListTooltipContentData {
  datasetIndex: number;
  dataset: {
    hoverBackgroundColor: Color | undefined;
    label: string;
    [x: string | number | symbol]: unknown;
  };
  formattedValue: string;
  raw: unknown;
  [x: string | number | symbol]: unknown;
}

export interface ListTooltipContentProps {
  className?: string;
  tooltipData: Array<ListTooltipContentData>;
  showDot?: boolean;
  showValue?: boolean;
}

export const ListTooltipContent: React.FunctionComponent<
  ListTooltipContentProps
> = ({ tooltipData, className, showDot = true, showValue = true }) => {
  // Removes undefined data, so we don't show data in the tooltip that isn't displayed on the chart (and isn't marked as explicitly 0).
  const filteredData = tooltipData.filter((item) => {
    return !isNil(item.raw);
  });
  return (
    <div className={cx('ListTooltipContent', className)}>
      {filteredData.map((item) => (
        <div
          className='ListTooltipContent__items'
          key={item.datasetIndex.toString(10)}
        >
          {showDot && (
            <Dot color={item.dataset.hoverBackgroundColor?.toString()} />
          )}
          <div className='ListTooltipContent__itemLabel'>
            {item.dataset.label ? item.dataset.label : ''}
          </div>
          {showValue && (
            <div className='ListTooltipContent__itemValue'>
              {item.formattedValue}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
