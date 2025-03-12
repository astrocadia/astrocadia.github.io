import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../common/buttons';
import './StreamButton.css';

export interface StreamButtonProps extends Omit<ButtonProps, 'onClick'> {
  activeLabel?: string;
  inactiveLabel?: string;
  initialState?: boolean;
  onClick?: (event: boolean) => void;
}

export const StreamButton: FunctionComponent<StreamButtonProps> = ({
  activeLabel = 'Stop Streaming',
  className = '',
  inactiveLabel = 'Stream',
  initialState = false,
  onClick = () => {},
  ...props
}) => {
  const [isActive, setIsActive] = useState(initialState);
  const [widthDiff, setWidthDiff] = useState(0);
  const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    setIsActive(!isActive);
    onClick(isActive);
  }, [isActive, onClick]);

  // Calculates the width difference between the label and the container on mount.
  useEffect(() => {
    if (containerRef.current && labelRef.current) {
      setWidthDiff(
        containerRef.current.clientWidth - labelRef.current.clientWidth
      );
    }
  }, [activeLabel, inactiveLabel]);

  // Sets the button width to the width of the label + the width difference.
  useEffect(() => {
    if (containerRef.current && labelRef.current) {
      const width = labelRef.current.clientWidth + widthDiff;

      setButtonStyle({
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
      });
    }
  }, [widthDiff, isActive]);

  return (
    <div
      className={cx('StreamButton', className, {
        StreamButton__active: isActive,
      })}
      ref={containerRef}
    >
      <Button
        className={cx('StreamButton__button', className)}
        onClick={handleClick}
        style={buttonStyle}
        {...props}
      >
        <div className='StreamButton__dotContainer'>
          <div className='StreamButton__dot' />
          {isActive && (
            <div className='StreamButton__backgroundRipple'>
              <div />
              <div />
            </div>
          )}
        </div>
        <div ref={labelRef}>{isActive ? activeLabel : inactiveLabel}</div>
      </Button>
    </div>
  );
};
