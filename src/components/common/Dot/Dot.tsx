import { FunctionComponent } from 'react';
import cx from 'classnames';
import './Dot.css';

export interface DotProps {
  className?: string;
  color?: string;
  height?: number;
}

export const Dot: FunctionComponent<DotProps> = ({
  className,
  color,
  height,
}) => {
  return (
    <div className={cx('DotContainer', className)}>
      <span
        className='Dot'
        style={{
          backgroundColor: color,
          height,
          width: height,
          borderRadius: height,
        }}
      />
    </div>
  );
};
