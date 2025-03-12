import cx from 'classnames';

import { createRef, ReactNode, Ref, useEffect, useMemo, useState } from 'react';
import './TooltipBox.css';
import { isNil } from '../../../utils/lang';

export interface TooltipBoxProps {
  className?: string;
  caretX: number;
  caretY: number;
  drawDirection: 'left' | 'right' | 'center';
  tooltipLabel: string;
  children?: ReactNode;
}

export const TooltipBox: React.FunctionComponent<TooltipBoxProps> = ({
  className,
  caretX,
  caretY,
  drawDirection,
  tooltipLabel,
  children,
  ...rest
}) => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(100);
  const ref: Ref<HTMLDivElement> = createRef();

  useEffect(() => {
    if (ref.current) {
      if (!isNil(ref.current.offsetWidth)) {
        setWidth(ref.current.offsetWidth);
      }
      if (!isNil(ref.current.offsetHeight)) {
        setHeight(ref.current.offsetHeight);
      }
    }
  }, [ref]);

  const leftPosition = useMemo(() => {
    switch (drawDirection) {
      case 'right':
        return caretX - width - 16;
      case 'center':
        return caretX - width / 2;
      case 'left':
      default:
        return caretX + 16;
    }
  }, [caretX, drawDirection, width]);

  const topPosition = useMemo(() => {
    let resolvedHeight;
    if (drawDirection === 'center') {
      resolvedHeight = caretY - height;
    } else {
      resolvedHeight = caretY - height / 2;
    }
    // Don't draw off the top of the chart
    if (resolvedHeight < 0) {
      resolvedHeight = 0;
    }
    return resolvedHeight;
  }, [caretY, drawDirection, height]);

  return (
    <div
      ref={ref}
      className={cx('TooltipBox', className)}
      style={{
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
      }}
      {...rest}
    >
      <div className='TooltipBox__label'>{tooltipLabel}</div>
      {children}
    </div>
  );
};
